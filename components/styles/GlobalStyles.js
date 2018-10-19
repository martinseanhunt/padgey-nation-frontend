import { createGlobalStyle } from 'styled-components'

/* Adding all styling here globally so it's not distracting in the components 
   for the purpose of this demo. I know this CSS is horrible, 
   I'm just getting something working quick */

export default createGlobalStyle`
  /*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */button,hr,input{overflow:visible}progress,sub,sup{vertical-align:baseline}[type=checkbox],[type=radio],legend{box-sizing:border-box;padding:0}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:ButtonText dotted 1px}fieldset{padding:.35em .75em .625em}legend{color:inherit;display:table;max-width:100%;white-space:normal}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}[hidden],template{display:none}

  a[aria-disabled='true'] {
    color: grey !important;
    pointer-events: none;
    opacity: 0.7;
  }

  * {
    font-family: Arial, Helvetica, sans-serif;
    box-sizing: border-box;
  }

  html {
    font-size: 10px;
  }

  body {
    background: #fbfbfd;
    font-family: 'Helvetica, sans-serif';
    text-align: center;
    margin-top: 50px;
  }

  .header {
    background: #fff;
    border-bottom: 1px solid #eaedf2;
    text-align: left;
    padding: 0 25px;
    position: fixed;
    width: 100%;
    top:0;
    left: 0;
    height: 50px;
    z-index: 1010;
    
    h1 {
      font-size: 1.9rem;
      color: #3e3f42;

      a {
        color: #3e3f42;
        text-decoration: none;
      }
    }

    svg {
      position: relative;
      top: 3px;
      left: -5px;
    }

    nav {
      display: block;
      position: absolute;
      top: 0;
      right: 10px;

      a {
        color: #272e5c;
        font-size: 1.6rem;
        text-decoration: none;
        display: inline-block;
        padding: 15px 10px;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .main {
    padding: 60px 30px;
    text-align: left; 
    max-width: 600px;
    margin: 0 auto;

    header {
      margin-bottom: 30px;
      position: relative;
      
      h2 {
        font-size: 3.8rem;
        font-weight: lighter;
        color: #3e3f42;
        margin-bottom: 0;
      }

      p {
        color: #9ea0a5;
        font-size: 1.4rem
      }

      .add-link {
        position: absolute;
        top: 25px;
        right: 0;
        font-size: 4rem;
        color: #272e5c;
        transition: 0.1s;

        &:hover {
          font-size: 4.2rem;
          right: -1px;
          top: 24px;
        }
      }
    }
    
  }

  .list-item {
    border: 1px solid #eaedf2;
    border-radius: 4px;
    background: #fff;
    padding: 30px 60px 30px 30px;
    text-align: left;
    box-shadow: 0 4px 8px 0 rgba(191,192,193,0.1);
    transition: 0.3s;
    font-size: 1.6rem;
    margin-bottom: 20px;
    position: relative;

    &:hover {
      box-shadow: 0 4px 8px 0 rgba(191,192,193,0.25);
    }

    button {
      position: absolute;
      top: 29px; 
      right: 27px;
      background: none;
      border: none;
      cursor: pointer;
      transition: 0.1s;
    }

    .delete:hover {
      font-size: 1.9rem;
      top: 28px;
      right: 26px;
    }

    &--form {
      input {
        margin-left: 10px;
        padding: 5px;
        border: 1px solid #f7f7f7;
        background: #f7f7f7;
        border-radius: 3px;
        width: 300px;
      }

      button {
        padding: 8px;
        background: #f7f7f7;
        border-radius: 3px;
        font-size: 1.4rem;
        color: #272e5c;

        &:hover {
          background: #272e5c;
          color: #fff;
        }
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    font-size: 1.3rem;
    line-height: 1.3rem;
    padding-top: 20px;

    a{
      padding: 12px 15px;
      background: #fff;
      border-radius: 3px;
      color: #272e5c;
      text-decoration: none;
      border: 1px solid #eaedf2;

      &:hover {
        background: #fcfcfc;
      }
    }
  }

  .loading-items {
    height: 500px;
    display: flex;
    font-size: 1.8rem;
    align-items: center;
    justify-content: center;
  }
`