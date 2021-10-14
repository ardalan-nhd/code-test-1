import React, { memo, Suspense } from "react";
import { Switch as RSwitch } from "react-router-dom";

function Switch({ fallback, children, ...others }) {
  return (
    <Suspense fallback={<div>{"wait.."}</div>}>
      <RSwitch {...others}>{children}</RSwitch>
    </Suspense>
  );
}

export default memo(Switch);
