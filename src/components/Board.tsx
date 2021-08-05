import { useEffect, useState, useRef } from "react"
import { Button, Slider, TextField, Box, Stack, Grid, Typography } from "@material-ui/core"

import Square from "./Square"

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

let mouseDown = false

document.body.onmousedown = () => {
    mouseDown = true
}

document.body.onmouseup = () => {
    mouseDown = false
}

function Board(): JSX.Element {
    const [size, setSize] = useState(10)
    const [squares, setSquares] = useState(
        Array.from({ length: size }, () => {
            return Array.from({ length: size }, () => 0)
        })
    )
    const [isPlaying, setPlaying] = useState(false)
    const [playTime, setPlayTime] = useState(200)

    useInterval(
        () => {
            play()
        },
        // Delay in milliseconds or null to stop it
        isPlaying ? playTime : null
    )

    useEffect(() => {
        setPlaying(false)
        setSquares(
            Array.from({ length: size }, () => {
                return Array.from({ length: size }, () => 0)
            })
        )
    }, [size])

    const renderSquare = (y: number, x: number): JSX.Element => {
        return (
            <Square value={squares[y][x]} onClick={() => handleClick(y, x)} mouseOver={() => handleHover(y, x)} />
        )
    }

    const handleHover = (y: number, x: number): void => {
        if (mouseDown) {
            handleClick(y, x)
        }
    }

    const handleClick = (y: number, x: number): void => {
        const newSquares = deepCopy(squares)
        newSquares[y][x] = squares[y][x] === 1 ? 0 : 1
        setSquares(newSquares)
    }

    const play = (): void => {
        const newSquares = deepCopy(squares)
        let changed = false
        squares.forEach((row, rowIdx) => {
            row.forEach((square, colIdx) => {
                const aliveNeighbors = countAliveNeighbors(squares, rowIdx, colIdx)

                if (square === 1 && [2, 3].includes(aliveNeighbors)) {
                    // Don't do anything here
                } else if (square === 0 && aliveNeighbors === 3) {
                    newSquares[rowIdx][colIdx] = 1
                    changed = true
                } else {
                    newSquares[rowIdx][colIdx] = 0
                    if (squares[rowIdx][colIdx] === 1) {
                        changed = true
                    }
                }
            })
        })
        setSquares(newSquares)
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

    return (
        <Box sx={{ alignItems: "center", width: "100vw", display: "flex", flexDirection: { md: "column" } }} mt={7}>
            <Stack direction="row" spacing={2}>
                <Button onClick={play}>Progress</Button>
                <Button onClick={() => setPlaying(true)}>Start</Button>
                <Button onClick={() => setPlaying(false)}>Stop</Button>
                <TextField
                    label="Board Size"
                    type="number"
                    defaultValue={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
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
                {squares.map((row, rowIdx) => row.map((col, colIdx) => <Grid item xs={1} key={`${rowIdx}:${colIdx}`}>{renderSquare(rowIdx, colIdx)}</Grid>))}
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
