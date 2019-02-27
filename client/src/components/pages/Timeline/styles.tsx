import styled from 'styled-components';
import { generateBoxShadow } from '../../styles/generate';

export const Timeline = styled.section`

$size-small: 768px;
// $size-medium: 800px;
$size-medium: 1170px;

overflow: hidden;
margin: 2em auto;
@media only screen and (min-width: $size-medium) {
  margin: 3em auto;
}
.timeline-wrapper {
  .timeline {
    position: relative;
    width: 90%;
    max-width: $size-medium;
    margin: 0 auto;
    padding: 2em 0;
    *,
    *::after,
    *::before {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    &::before {
      /* this is the vertical line */
      content: '';
      position: absolute;
      top: 0;
      left: 18px;
      height: 100%;
      width: 4px;
      background: #d7e4ed;
      @media only screen and (min-width: $size-medium) {
        left: 50%;
        margin-left: -2px;
      }
    }
    .timeline-block {
      position: relative;
      width: 100%;
      margin: 2em 0 4em 0;
      &:after {
        content: "";
        display: table;
        clear: both;
      }
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
      .content {
        position: relative;
        margin-left: 60px;
        background: white;
        background: none;
        border-radius: 0.25em;
        padding: 0 1.6em 12px 1.6em; // padding: 1em;
        transition: .4s ease-in-out; // -webkit-box-shadow: 0 3px 0 #d7e4ed;
        height: fit-content;
        box-shadow: 0 3px 0 #d7e4ed;
        &::before {
          @media only screen and (min-width: $size-medium) {
            top: 24px;
            left: 100%;
            border-color: transparent;
            border-left-color: white;
          }
        }
        &.bounce-in {
          visibility: visible;
          -webkit-animation: bounce-left 0.6s;
          animation: bounce-left 0.6s;
        }
        /* &:after {
          content: "";
          display: table;
          clear: both;
        }
        &::before {
          content: '';
          position: absolute;
          top: 16px;
          right: 100%;
          height: 0;
          width: 0;
          border: 7px solid transparent;
        } */
        @media only screen and (min-width: $size-medium) {
          margin-left: 0;
          padding: 12px 1.6em;
          width: 45%;
          /* Force Hardware Acceleration */
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }
        h2 {
          font-weight: bold;
          font-size: 1.8rem;
          color: #303e49;
          background-color: none;
          margin: 0 0 12px 0;
          @media only screen and (min-width: $size-small) {
            font-size: 2.2rem;
          }
        }
        h3 {
          font-weight: bold;
          font-size: 1.2rem;
          margin: 0.4rem 0;
          @media only screen and (min-width: $size-small) {
            font-size: 1.6rem;
          }
        }
        .main {
          display: flex;
          flex-flow: column wrap;
          margin: 0 0 0.5em 0;
        }
        .keywords {
          display: flex;
          flex-flow: column wrap;
          font-size: 1.3rem;
          margin: 0.3em 0;
          line-height: 1.6;
          @media only screen and (min-width: $size-small) {
            font-size: 1.6rem;
          }
        }
        p {
          font-size: 1.3rem;
          overflow: hidden;
          margin: 0.5em 0;
          line-height: 1.6;
          max-height: 100px;

          &.body {
            margin: 0 0;

            .edge {
              position: absolute;
              top: 171px;
              left: 0;
              width: 100%;
              height: 0px;
              ${generateBoxShadow({ blur: 10, spread: 10, color: { r: 255, g: 255, b: 255, opacity: 0.75 } })}
            }
          }
          @media only screen and (min-width: $size-small) {
            font-size: 1.6rem;
          }
          &.expanded {
            max-height: fit-content;
          }
        }
        .read-more {
          display: flex;
          justify-content: center; // float: right;
          font-size: 1.3rem; // padding: .8em 1em;
          padding: 0; // background: #acb7c0;
          // color: white;
          border-radius: 0.25em;
          cursor: pointer; // &:hover {
          //   background-color: #bac4cb;
          // }
          @media only screen and (min-width: $size-small) {
            font-size: 1.4rem;
          }
        }
        .date {
          font-size: 1.3rem;
          display: inline-block; // float: left;
          padding: .8em 0;
          opacity: .7;
          @media only screen and (min-width: $size-small) {
            font-size: 1.4rem;
          }
          @media only screen and (min-width: $size-medium) {
            position: absolute;
            width: 100%;
            left: 122%;
            top: 6px;
            font-size: 1.6rem;
          }
        }
      }
      &:nth-child(even) {
        .content {
          @media only screen and (min-width: $size-medium) {
            float: right;
          }
          &::before {
            top: 24px;
            left: auto;
            right: 100%;
            border-color: transparent;
          }
          @media only screen and (min-width: $size-medium) {
            &.bounce-in {
              -webkit-animation: bounce-right 0.6s;
              animation: bounce-right 0.6s;
            }
          }
          .date {
            left: auto;
            right: 122%;
            text-align: right;
          }
        }
      }
      @media only screen and (min-width: $size-medium) {
        margin: 4em 0;
      }
      .image {
        display: flex;
        position: absolute;
        justify-content: center;
        align-items: center; // top: 0;
        // left: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%; // -webkit-box-shadow: 0 0 0 4px white, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05);
        // box-shadow: 0 0 0 4px white, inset 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05);
        -webkit-box-shadow: 0 0 4px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05);
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.15), 0 2px 0 rgba(0, 0, 0, 0.08), 0 3px 0 4px rgba(0, 0, 0, 0.05); // background: orange;
        background: white;
        @media only screen and (min-width: $size-medium) {
          width: 60px;
          height: 60px;
          left: 50%;
          margin-left: -30px;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
        }
        &.bounce-in {
          visibility: visible;
          -webkit-animation: bounce-appear 0.6s;
          animation: bounce-appear 0.6s;
        }
        img,
        i {
          max-width: calc(50% + 5px);
          max-height: calc(50% + 5px);
          height: auto;
          width: auto;
        }
      }
    }
  }
}

.hidden {
  visibility: hidden;
}


/************
* Keyframes *
*************/

@-webkit-keyframes bounce-appear {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  60% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes bounce-appear {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  60% {
    opacity: 1;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@-webkit-keyframes bounce-left {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-100px);
    transform: translateX(-100px);
  }
  60% {
    opacity: 1;
    -webkit-transform: translateX(20px);
    transform: translateX(20px);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@keyframes bounce-left {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-100px);
    transform: translateX(-100px);
  }
  60% {
    opacity: 1;
    -webkit-transform: translateX(20px);
    transform: translateX(20px);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@-webkit-keyframes bounce-right {
  0% {
    opacity: 0;
    -webkit-transform: translateX(100px);
    transform: translateX(100px);
  }
  60% {
    opacity: 1;
    -webkit-transform: translateX(-20px);
    transform: translateX(-20px);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@keyframes bounce-right {
  0% {
    opacity: 0;
    -webkit-transform: translateX(100px);
    transform: translateX(100px);
  }
  60% {
    opacity: 1;
    -webkit-transform: translateX(-20px);
    transform: translateX(-20px);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
`;
