import React from "react";
import {observer} from "mobx-react-lite";

function NotFound() {
    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)"
            }}>
<
    h1 > Страница
    не
    найдена < /h1>
</div>
)
    ;
}

export default observer(NotFound);
