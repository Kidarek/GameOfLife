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
import { ArrowForward, PlayArrow, Stop } from "@material-ui/icons"

import Square from "./Square"
import SimpleMenu from "./Menu"
import { store } from "../store"
import { useDispatch } from "react-redux"
import { CellDiff, reset, step, randomizer } from "../lifeSlice"



function Board(): JSX.Element {
    const [size, setSize] = useState(10)
    const [isPlaying, setPlaying] = useState(false)
    const [playTime, setPlayTime] = useState(200)
    const [randomFillPercent, setRandomFillPercent] = useState(50)
    const [dummyArr, setDummyArr] = useState(
        Array.from({ length: size }, () => {
            return 0
        })
    )
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
        setDummyArr(
            Array.from({ length: size }, () => {
                return 0
            })
        )
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
                    diff.push({ x: colIdx, y: rowIdx, state: 1 })
                    changed = true
                } else if (squares[rowIdx][colIdx] === 1) {
                    diff.push({ x: colIdx, y: rowIdx, state: 0 })
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
        dispatch(reset(size))
    }

    const fillRandom = (): void => {
        dispatch(randomizer(randomFillPercent))
    }

    return (
        <Box sx={{ alignItems: "center", width: "100vw", display: "flex", flexDirection: { xs: "column" } }} mt={7}>
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
                <Button onClick={play}>
                    <ArrowForward></ArrowForward>
                </Button>
                <Button onClick={() => setPlaying(true)}>
                    <PlayArrow></PlayArrow>
                </Button>
                <Button onClick={() => setPlaying(false)}>
                    <Stop></Stop>
                </Button>
                <Button onClick={fillRandom}>Random</Button>
                <Button onClick={() => clearBoard()}>Clear</Button>
                <SimpleMenu
                    size={size}
                    sizeOnChange={setSize}
                    randomFillPercent={randomFillPercent}
                    setRandomFillPercent={setRandomFillPercent}
                    playTime={playTime}
                    setPlayTime={setPlayTime}
                    ></SimpleMenu>
            </Stack>
            <Stack direction="row" spacing={2} mt={2}></Stack>
            <Box width={500} mt={5} mb={5}>
                
            </Box>
            <Grid container id="board" spacing={0} columns={{ xs: size }} sx={{ width: 34 * size }}>
                {dummyArr.map((row, rowIdx) =>
                    dummyArr.map((col, colIdx) => (
                        <Grid item xs={1} key={`${rowIdx}:${colIdx}`}>
                            <Square x={colIdx} y={rowIdx} />
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    )
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
