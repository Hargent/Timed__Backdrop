import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

export default function SimpleBackdrop() {
  const [open, setOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    toggle();
    setOpen(!open);
  };

  function toggle() {
    setIsActive(true);
  }

  useEffect(() => {
    function reset() {
      setSeconds(3);
      setIsActive(false);
    }
    let interval = 3;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      if (isActive && seconds <= -1) {
        handleToggle();
        handleClose();
        reset();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div>
      <Button onClick={handleToggle}>Show backdrop</Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
