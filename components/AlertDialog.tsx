"use client";
import React from "react";
import { useGlobal } from "@app/context/GlobalContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
function AlertDialog() {
  const { alert } = useGlobal();
  return (
    <>
      {alert.show ? (
        <Alert className="alert">
          <AlertTitle></AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      ) : null}
    </>
  );
}

export default AlertDialog;
