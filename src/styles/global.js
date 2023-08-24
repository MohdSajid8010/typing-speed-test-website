import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`

* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: sans-serif;


}

body {
    background-color:${(props) => props.theme.background};
    color:${(props) => props.theme.textColor};

    transition: all 0.5s linear;

}

.logo {
    font-size: 28px;
    font-size: 500;
}
.icons{
    font-size: 30px;
}

.canvas {
    min-height: 100vh;

    display: flex;
    flex-flow: column wrap;
    width: 80vw;
    margin: auto;
    padding: 2rem;
    align-items: center;
    justify-content: space-between;
    gap: 90px;
    // border: 4px solid blue;



}

.middle {
    width: 100%;
    // min-height:475px;

}

.type-box {
    border:1px solid ${(props) => props.theme.typeBoxTextColor};
    display: block;
    overflow-x: hidden;




}

.words {
    // border:1px solid yellow;
    display: flex;
    flex-flow: row wrap;

    font-size: 32px;
    color:${(props) => props.theme.typeBoxTextColor};

}

.word {
    // border:1px solid blue;
    margin: 5px;
    padding-right: 2px;
}

.current {

    // border-left: 1px solid black;
    border-left: 2px solid black;

    animation: blinking 2s infinite linear;
}

@keyframes blinking {

    0% {
        border-left-color: ${(props) => props.theme.typeBoxTextColor};
    }

    25% {
        border-left-color: ${(props) => props.theme.background};
    }

    50% {
        border-left-color: ${(props) => props.theme.typeBoxTextColor};
    }

    75% {
        border-left-color: ${(props) => props.theme.background};
    }

    100% {
        border-left-color: ${(props) => props.theme.typeBoxTextColor};
    }
}

.current-right {
    border-right: 2px solid black;
    animation: blinking-right 2s infinite linear;
}

@keyframes blinking-right {

    0% {
        border-right-color: ${(props) => props.theme.typeBoxTextColor};
    }

    25% {
        border-right-color: ${(props) => props.theme.background};
    }

    50% {
        border-right-color: ${(props) => props.theme.typeBoxTextColor};
    }

    75% {
        border-right-color:${(props) => props.theme.background};
    }

    100% {
        border-right-color: ${(props) => props.theme.typeBoxTextColor};
    }
}

.correct {
    color:${(props) => props.theme.textColor};
}

.incorrect {
    color: red;

}

.upper-menu {
    display: flex;
    justify-content: space-between;
    margin: auto;
    font-size: 1.4rem;
    margin-bottom: 10px;
}

.modes {
    display: flex;
    gap: 0.4rem;

}

.time-mode {
    padding: 2px 10px;
    border-radius: 5px;
    // background-color: darksalmon;
    // background-color: #00b78b;
    border: 1px solid ${(props) => props.theme.typeBoxTextColor};

}

.time-mode:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.typeBoxTextColor};
    border: none;
}
.modes .active{
    background-color: ${(props) => props.theme.typeBoxTextColor};      
}
.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;


    font-size: 1.4rem;
}

.links {
    display: flex;
    gap: 10px;
    cursor: pointer;
}

.links a {
    color: inherit;
}

.stats-box {
    display: flex;
    /* justify-content: space-between; */
    margin: auto;

}

.stats-box .left {

    width: 20%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border: 1px solid ${(props) => props.theme.typeBoxTextColor};

}

.stats-box .left .title {
    font-size: 20px;
    color:${(props) => props.theme.typeBoxTextColor};
}

.stats-box .left .sub-title {
    font-size: 30px;
}

.stats-box .right {
    width: 80%;
    border: 1px solid ${(props) => props.theme.typeBoxTextColor};;

}


.header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 1.4rem;

}


.user-info {
    width: 100%;
    margin: auto;
    display: flex;
    // border: 1px solid red;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 180px;
    padding: 10px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.typeBoxTextColor};

}

.user {
    // border: 1px solid red;
    border-right: 2px solid ${(props) => props.theme.textColor};

    display: flex;
    justify-content: center;

    align-items: center;
    gap: 10px;

}

.picture {
    // width: 24%;
}

.user-total-test {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    flex-direction: column;
    gap: 10px;

}

.email {
    font-size: 18px;
    font-weight: 600;
}

.user-info-graph,
.table {
    width: 100% !important;
    margin: auto;
    border: 1px solid ${(props) => props.theme.textColor};
}

.tableCell {
    color:${(props) => props.theme.textColor};
    text-align: center;
    font-size: 20px;
    border:1px solid ${(props) => props.theme.textColor};
}

.line-component {
    width: 100% !important;

}

.parentOfloader {
    display: flex;
    justify-content: center;
    width: 100vw;
    align-items: center;
    min-height: 100vh;
}

.hidden-inp {
    // visibility: hidden;
    width: 0px;
    height: 0px;
    background-color:${(props) => props.theme.background};
    outline: none;
    border: none;
}

@media (max-width:1150px) {
    .stats-box .left {
        width: 30%;
    }

    .stats-box .right {
        width: 70%;
    }
}

@media (max-width:800px) {
    .canvas {
        width: 100vw;
    }

    .line-component {
        font-size: 16px;

    }


    .user-info {
        grid-template-columns: 1fr;
    }

    .user {
        border-right: none;
    }
    .user-total-test {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 1.2rem;
        flex-flow: row wrap;
        gap: 10px;
        padding-top: 19px;
        border-top: 1px solid ${(props) => props.theme.textColor};
    
    }
    .stats-box {
        flex-direction: column;
    }

    .stats-box .right,
    .stats-box .left {
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
    }

    .tableCell {
        font-size: 16px;

    }



}

@media (max-width: 440px) {
    .stats-box .left {
        width: 100%;
        flex-direction: column;
    }
    .user {
        border-right: none;
        flex-direction: column;
        margin-bottom: 10px;
        gap: 0px;
    }
    .tableCell {
        font-size: 15px;
        padding: 5px;
    }
    .stats-box .left .title {
        font-size: 16px;
    }
    .stats-box .left .sub-title {
        font-size: 20px;
    }
    .canvas {
        padding:1rem 0.8rem;
    }
    .logo {
        font-size: 22px;
        font-size: 500;
    }
    .words {
        font-size: 23px;
    }
}


`
