import React from "react"
import { Button, Menu, MenuItem, TextField, InputAdornment, Slider, Typography, Stack } from "@material-ui/core"
import SettingsIcon from "@material-ui/icons/Settings"

interface MenuProps {
    size: number
    sizeOnChange: (size: number) => void
    randomFillPercent: number
    setRandomFillPercent: (fillPercent: number) => void
    playTime: number
    setPlayTime: (playTime: number) => void
}

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

export default function SimpleMenu(props: MenuProps): JSX.Element {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = (): void => {
        setAnchorEl(null)
    }

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <SettingsIcon></SettingsIcon>
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem>
                    <TextField
                        label="Board Size"
                        type="number"
                        InputProps={{ inputProps: { min: 1 } }}
                        defaultValue={props.size}
                        onChange={(e) => props.sizeOnChange(parseInt(e.target.value))}
                    />
                </MenuItem>
                <MenuItem>
                    <TextField
                        label="Percentage of squares filled"
                        type="number"
                        InputProps={{
                            inputProps: { min: 0, max: 100 },
                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                        defaultValue={props.randomFillPercent}
                        onChange={(e) => props.setRandomFillPercent(parseInt(e.target.value))}
                    />
                </MenuItem>
                <MenuItem>
                    <Stack direction="column" width='100%' ml={1}>
                        <Typography>Time Between Moves</Typography>
                        <Slider
                            min={50}
                            max={1000}
                            defaultValue={props.playTime}
                            onChange={(_, val) => props.setPlayTime(val as number)}
                            marks={marks}></Slider>
                    </Stack>
                </MenuItem>
            </Menu>
        </div>
    )
}
