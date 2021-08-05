import { useEffect, useState, useRef } from "react"
import {
    Button,
    Slider,
    TextField,
    Box,
    Stack,
    Grid,
    Typography,
    Tooltip,
    Icon,
    InputAdornment
} from "@material-ui/core"
import HelpIcon from "@material-ui/icons/Help"

import Square from "./Square"
import { RootState, store } from "../store"
import { useSelector, useDispatch } from 'react-redux'
import { CellDiff, reset, step } from "../lifeSlice"
import { createSelector } from "@reduxjs/toolkit"

const marks = [
    {
        value: 50,
        label: "50ms"
    },
    {
        value: 1000,
        label: "1s"
    }
]

function Board(): JSX.Element {
    const [size, setSize] = useState(10)
    const [isPlaying, setPlaying] = useState(false)
    const [playTime, setPlayTime] = useState(200)
    const [randomFillPercent, setRandomFillPercent] = useState(50)
    const [dummyArr, setDummyArr] = useState(Array.from({ length: size }, () => { return 0 }))
    const dispatch = useDispatch()

    useInterval(
        () => {
            play()
        },
        // Delay in milliseconds or null to stop it
        isPlaying ? playTime : null
    )

    useEffect(() => {
        setPlaying(false)
        setDummyArr(Array.from({ length: size }, () => { return 0 }))
        dispatch(reset(size))
    }, [size])

    const play = (): void => {
        let changed = false
        const diff: CellDiff[] = []

        const squares = store.getState().life.value

        squares.forEach((row, rowIdx) => {
            row.forEach((square, colIdx) => {
                const aliveNeighbors = countAliveNeighbors(squares, rowIdx, colIdx)

                if (square === 1 && [2, 3].includes(aliveNeighbors)) {
                    // Don't do anything here
                } else if (square === 0 && aliveNeighbors === 3) {
                    diff.push({x: colIdx, y: rowIdx, state: 1})
                    changed = true
                } else if (squares[rowIdx][colIdx] === 1) {
                    diff.push({x: colIdx, y: rowIdx, state: 0})
                    changed = true
                }
            })
        })

        if (diff.length > 0) {
            dispatch(step(diff))
        }
        if (!changed) {
            setPlaying(false)
        }
    }

    const countAliveNeighbors = (board: number[][], y: number, x: number): number => {
        let total = 0
        if (x > 0 && y > 0) {
            total += board[y - 1][x - 1]
        }
        if (x < board[y].length - 1 && y > 0) {
            total += board[y - 1][x + 1]
        }
        if (x > 0 && y < board.length - 1) {
            total += board[y + 1][x - 1]
        }

        if (x < board[y].length - 1 && y < board.length - 1) {
            total += board[y + 1][x + 1]
        }

        if (x > 0) {
            total += board[y][x - 1]
        }
        if (x < board[y].length - 1) {
            total += board[y][x + 1]
        }
        if (y > 0) {
            total += board[y - 1][x]
        }

        if (y < board.length - 1) {
            total += board[y + 1][x]
        }

        return total
    }

    const clearBoard = (): void => {
        // setSquares(
        //     Array.from({ length: size }, () => {
        //         return Array.from({ length: size }, () => 0)
        //     })
        // )
    }

    const fillRandom = (): void => {
        // setSquares(
        //     squares.map((row, rowIdx) => row.map((col, colIdx) => (getRandomInt(101) < randomFillPercent ? 1 : 0)))
        // )
    }

    return (
        <Box sx={{ alignItems: "center", width: "100vw", display: "flex", flexDirection: { md: "column" } }} mt={7}>
            <Stack direction="row">
                <Typography variant="h3" gutterBottom>
                    Conway's Game of Life
                </Typography>
                <Tooltip title="Click squares to set up a pattern then either press progress to step once or start">
                    <Icon aria-label="Click squares to set up a pattern then either press progress to step once or start">
                        <HelpIcon />
                    </Icon>
                </Tooltip>
            </Stack>

            <Stack direction="row" spacing={2}>
                <Button onClick={play}>Progress</Button>
                <Button onClick={() => setPlaying(true)}>Start</Button>
                <Button onClick={() => setPlaying(false)}>Stop</Button>
                <Button onClick={() => clearBoard()}>Clear</Button>
                <TextField
                    label="Board Size"
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                    defaultValue={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
                />
            </Stack>
            <Stack direction="row" spacing={2} mt={2}>
                <Button onClick={fillRandom}>Random</Button>
                <TextField
                    label="Percentage of squares filled"
                    type="number"
                    InputProps={{
                        inputProps: { min: 0, max: 100 },
                        endAdornment: <InputAdornment position="end">%</InputAdornment>
                    }}
                    defaultValue={randomFillPercent}
                    onChange={(e) => setRandomFillPercent(parseInt(e.target.value))}
                />
            </Stack>
            <Box width={500} mt={5} mb={5}>
                <Typography>Time Between Moves</Typography>
                <Slider
                    min={50}
                    max={1000}
                    defaultValue={playTime}
                    onChange={(_, val) => setPlayTime(val as number)}
                    marks={marks}></Slider>
            </Box>
            <Grid container id="board" spacing={0} columns={{ xs: size }} sx={{ width: 34 * size }}>
                {dummyArr.map((row, rowIdx) => dummyArr.map((col, colIdx) => (
                    <Grid item xs={1} key={`${rowIdx}:${colIdx}`}>
                        <Square x={colIdx} y={rowIdx} />
                    </Grid>
                )))}
            </Grid>
        </Box>
    )
}

function deepCopy<T>(arr: T[][]): T[][] {
    const newArr: T[][] = []
    arr.forEach((arr) => {
        newArr.push(arr.slice())
    })
    return newArr
}

export const useInterval = (callback: any, delay: number | null): void => {
    const savedCallback = useRef<any>()

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        function tick(): void {
            if (savedCallback !== undefined) {
                savedCallback.current()
            }
        }
        if (delay !== null) {
            const id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}

export default Board

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max)
}
