import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`

*{
    margin:0px;
    padding:0px;
    box-sizing:border-box;
    // font-family: sans-serif;

    
}
body{
    background-color:${(props) => props.theme.background};
    color:${(props) => props.theme.textColor};
    
    transition: all 0.5s linear;

}
.canvas{
    min-height: 100vh;
    display: grid;
    grid-auto-flow: row;
    // grid-template-rows: 1fr 1fr 1fr;
    grid-template-rows: auto auto auto;

    gap:20px;
    width:1000px;
    padding:2rem;
    margin:auto;
    justify-items: center;
    text-align: center;
    
    
}
.type-box{
    // border:1px solid white;
    display: block;
    max-width: 1000px;
    // height: 140px;
    margin-left: auto;
    margin-right: auto;
    overflow-x: hidden;
   
    


}
.words{
    border:1px solid yellow;
    display: flex;
    flex-flow: row wrap;
    // row-gap:10px;
    // column-gap: 20px;

    font-size:32px;  
    color:${(props) => props.theme.typeBoxTextColor};

}
.word{
    // border:1px solid blue;
    margin: 5px;
    padding-right: 2px;
}
.current{

    border-left: 1px solid black;
    // border-left: 2px solid yellow;

    animation:blinking 2s infinite linear;
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

.current-right{
    border-right: 1px solid black;
    animation:blinking-right 2s infinite linear;
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
.correct{
    color:green;
}
.incorrect{
    color:red;

}

.upper-menu{
    display: flex;
    justify-content: space-between;
    max-width: 1000px;
    margin: auto;
    font-size: 1.4rem;
    // padding: 0.5rem;
}

.modes{
    display: flex;
    gap:0.4rem;
    
}
.time-mode:hover{
    cursor: pointer;
    color: gray;
}

.footer{
// border: 1px solid green;
    display: flex;
    justify-content: space-between;
    // width: 1000px;
    width: 500px;


    // max-width: 1000px;
    margin: auto;
    font-size: 1.4rem;
    // padding: 0.5rem;
}
.stats-box{
    border: 1px solid green;
    display: flex;
    /* justify-content: space-between; */
    max-width: 1000px;
    margin: auto;
    // font-size: 1.4rem;
    // padding: 0.5rem;
    
}
.stats-box .left{
  
    width: 30%;
    padding: 30px;
    }

    .stats-box .left .title{
        border: 1px solid green;
        font-size: 20px;
        color:${(props) => props.theme.typeBoxTextColor}
        }
        .stats-box .left .sub-title{
            border: 1px solid green;
            font-size: 30px;
            }
    .stats-box .right{
        border: 1px solid blue;
        width: 70%;
            
        }


        .header{
            display: flex;
            justify-content: space-between;
            width: 500px;
            margin: auto;
            font-size: 1.4rem;
            border: 1px solid blue;
    
        }


        .user-info{
            width: 1000px;
            margin: auto;
            display: flex;
            border: 1px solid red;
            display: grid;
            grid-template-columns: 1fr 1fr;
    min-height: 180px;
    padding: 10px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.typeBoxTextColor};

        }
        .user {
            // width: 80%;
    // border: 1px solid red;
    border-right: 2px solid ${(props) => props.theme.textColor};

    // margin: auto;
    display: flex;
    justify-content: center;

    align-items: center;
    gap: 10px;
            
        }
        .picture{
            // width: 24%;
        }

        .user-total-test{
            display: flex;
            justify-content: center;
            align-items: center;
    font-size: 1.8rem;

        }
        .email{
            font-size: 18px;
            font-weight: 600;
        }

        .hidden-inp{
            visibility: hidden;
        }

        .user-info-graph,.table{
            width: 1000px !important;

            margin: auto;
    border: 1px solid red;

        }

        .parentOfloader{
            display: flex;
            justify-content: center;
            width: 100vw;
    align-items: center;
    min-height: 100vh;
        
        
        }
`
