const htmlData = () => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
    
        <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://mindspark.in/Mindspark/Student/assets/js/contentService.js?v=2.3.2.20" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/iv-viewer/dist/iv-viewer.css"
        />
        <script src="https://unpkg.com/iv-viewer/dist/iv-viewer.js"></script>
    
        <script>
          MathJax = {
            tex: {
              inlineMath: [
                ['$', '$'],
                ['\{', '\}'],
                ['<equ>', '</equ>'],
              ],
              displayMath: [['$$', '$$']],
            },
          };
        </script>
        <script
          type="text/javascript"
          id="MathJax-script"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        ></script>
        <script>
          MathJax.typesetPromise()
            .then(() => {
              // modify the DOM here
              MathJax.typesetPromise();
            })
            .catch(err => console.log(err.message));
        </script>
    
        <script>
          $(document).ready(function () {
            var aud = $('audio')[0];
            var btn = $('#audioPlay');
            btn.click(function () {
              aud.play();
              // if (aud.paused) {
              //   aud.play();
              // }else{
              //   aud.pause();
              // }
              btn.toggleClass('paused');
              return false;
            });
          });
    
          window.webViewBridge = {
            send: function (data) {
              // document.getElementById("output").innerHTML=data
              window.ReactNativeWebView.postMessage(data);
            },
          };
    
          window.addEventListener('message', function (e) {
            console.log('message received from react native');
    
            var message;
            try {
              message = JSON.parse(e.data);
            } catch (err) {
              console.error('failed to parse message from react-native ' + err);
              return;
            }
            document.getElementById('inputbox').value = message.value;
            document.getElementById('fromrn').innerHTML =
              'Message from RN:' + message.value;
          });
    
          //init();
          // let obj={access:access};
          // window.ReactNativeWebView.postMessage(JSON.stringify(obj));
    
          function dropDownOnChangeFunction(dropDownId) {
            let obj = {};
            if (document.getElementById(dropDownId).value != '') {
              obj[dropDownId] = document.getElementById(dropDownId).value;
              var x = document.getElementById('mySelect').value;
              window.ReactNativeWebView.postMessage(JSON.stringify(obj));
            }
          }
    
          function inputChangeFunction(inputBoxId) {
            try {
              let obj = {};
              obj[inputBoxId] = document.getElementById(inputBoxId).value;
              window.ReactNativeWebView.postMessage(JSON.stringify(obj));
            } catch (err) {
              alert(err);
            }
          }
    
          window.addEventListener(
            'message',
            function (event) {
              //alert("W:"+event.data)
              console.log('Received post message From RN W:', event);
              console.log(event.data);
              let obj = {};
              // obj["received_from_react_w"]=event.data
              // window.ReactNativeWebView.postMessage(JSON.stringify(obj));
            },
            false
          );
    
          document.addEventListener(
            'message',
            function (event) {
              // alert("D:"+event.data)
              console.log('Received post message From RN D:', event);
              console.log(event.data);
    
              let obj = {};
              obj['received_from_react_d'] = event.data;
              window.ReactNativeWebView.postMessage(JSON.stringify(obj));
            },
            false
          );
    
          $(window).on('load', function () {
            let obj = {};
            obj.type = 'loadStatus';
            obj.loaded = true;
            window.ReactNativeWebView.postMessage(JSON.stringify(obj));
          });
    
          function ddButtonClickHandler(elmt) {
            //alert(elmt.id)
            var ddBtnObj = {};
            ddBtnObj.id = elmt.id;
            ddBtnObj.type = 'select';
    
            window.ReactNativeWebView.postMessage(JSON.stringify(ddBtnObj));
          }
    
          function ddChoiceSelectHandler(id, value) {
            // alert(value);
            document.getElementById(id).innerHTML =
              value + '<i class="arrow down"></i>';
          }
    
          function disableWebView() {
            document.getElementById('contentField').disabled = true;
          }
    
          var contentServiceObject;
          var contentObject;
    
          function initContentService(data) {
            try {
              contentServiceObject = new ContentService(data);
              contentObject = contentServiceObject[0];
              let obj = {
                init: 'Init Done',
              };
              window.ReactNativeWebView.postMessage(JSON.stringify(obj));
              return true;
            } catch (err) {
              alert('Errror+');
              window.ReactNativeWebView.postMessage(
                JSON.stringify({ ERROR: 'err' })
              );
              return true;
            }
          }
    
          function evaluateAnswer(data, inputData, id) {
            // let contentServiceObject = new ContentService(data);
            // let contentObject = contentServiceObject[0];
            try {
              if (contentServiceObject) {
                let obj = {
                  type: 'ContentService',
                  function: 'evaluateAnswer',
                };
    
                let val = contentObject.evaluateAnswer(
                  inputData ? JSON.stringify(inputData) : null
                );
                let subVal = contentObject.getSubmitData();
                obj.evaluatedResult = val;
                obj.submitData = subVal;
                obj.id = id;
                window.ReactNativeWebView.postMessage(JSON.stringify(obj));
              } else {
                contentServiceObject = new ContentService(data);
                contentObject = contentServiceObject[0];
                let obj = {
                  type: 'ContentService',
                  function: 'evaluateAnswer',
                };
    
                let val = contentObject.evaluateAnswer(
                  inputData ? JSON.stringify(inputData) : null
                );
                let subVal = contentObject.getSubmitData();
                obj.evaluatedResult = val;
                obj.submitData = subVal;
                obj.id = id;
                window.ReactNativeWebView.postMessage(JSON.stringify(obj));
              }
            } catch (err) {
              alert(err.message);
              let obj = {
                error: err,
              };
              window.ReactNativeWebView.postMessage(JSON.stringify(obj));
            }
          }
    
          function checkIframe() {
            try {
              var frame = document.getElementById('quesInteractive');
              var win = frame.contentWindow;
              try {
                win.postMessage('checkGameComplete', '*');
              } catch (ex) {
                alert('error1');
              }
            } catch (ex) {
              alert('error2');
            }
          }
    
          function getTemplate() {
            let obj = {
              type: 'ContentService',
              function: 'getTemplate',
            };
            let template = contentObject.getTemplate();
            template = template.toLowerCase();
            obj.template = template;
            window.ReactNativeWebView.postMessage(JSON.stringify(obj));
            //document.body.style.backgroundColor = 'blue';
          }
    
          function getContentType() {
            let obj = {
              type: 'ContentService',
              function: 'getContentType',
            };
            let val = contentObject.getContentType();
            obj.contentType = val;
            window.ReactNativeWebView.postMessage(JSON.stringify(obj));
          }
    
          function getDisplayObject() {
            let obj = {
              type: 'ContentService',
              function: 'getDisplayObject',
            };
            let val = contentObject.getDisplayObject();
            obj.displayObject = val;
            window.ReactNativeWebView.postMessage(JSON.stringify(obj));
          }
    
          function getDisplayObjectForView() {
            let obj = {
              type: 'ContentService',
              function: 'getDisplayObjectForView',
            };
            let val = contentObject.getDisplayObjectForView();
            obj.displayObjectForView = val;
            window.ReactNativeWebView.postMessage(JSON.stringify(obj));
          }
    
          function getExplanation() {
            let obj = {
              type: 'ContentService',
              function: 'getExplanation',
            };
            let val = contentObject.getExplanation();
            obj.explanation = val;
            window.ReactNativeWebView.postMessage(JSON.stringify(obj));
          }
    
          function getHints() {
            let obj = {
              type: 'ContentService',
              function: 'getHints',
            };
            let val = contentObject.getHints();
            obj.hints = val;
            window.ReactNativeWebView.postMessage(JSON.stringify(obj));
          }
    
          function getContentInfo() {
            let obj = {
              type: 'ContentService',
              function: 'getContentInfo',
            };
            let val = contentObject.getContentInfo();
            obj.contentInfo = val;
            window.ReactNativeWebView.postMessage(JSON.stringify(obj));
          }
    
          function getCorrectAnswer() {
            let obj = {
              type: 'ContentService',
              function: 'getCorrectAnswer',
            };
            let val = contentObject.getCorrectAnswer();
            obj.correctAnswer = val;
            window.ReactNativeWebView.postMessage(JSON.stringify(obj));
          }
    
          function getTranslatedDisplayObject() {
            let obj = {
              type: 'ContentService',
              function: 'getTranslatedDisplayObject',
            };
            let val = contentObject.getTranslatedDisplayObject();
            obj.translatedDisplayObject = val;
            window.ReactNativeWebView.postMessage(JSON.stringify(obj));
          }
    
          function getTranslatedExplanation() {
            let obj = {
              type: 'ContentService',
              function: 'getTranslatedExplanation',
            };
            let val = contentObject.getTranslatedExplanation();
            obj.translatedExplanation = val;
            window.ReactNativeWebView.postMessage(JSON.stringify(obj));
          }
    
          function getTranslatedHints() {
            let obj = {
              type: 'ContentService',
              function: 'getTranslatedHints',
            };
            let val = contentObject.getTranslatedHints();
            obj.translatedHints = val;
            window.ReactNativeWebView.postMessage(JSON.stringify(obj));
          }
    
          function checkIndividualBlank(
            expectedAns,
            userResponse,
            fracboxCheck,
            blankNo,
            blankName
          ) {
            let obj = {
              type: 'ContentService',
              function: 'getTranslatedHints',
            };
            let val = contentObject.checkIndividualBlank(
              expectedAns,
              userResponse,
              fracboxCheck,
              blankNo,
              blankName
            );
            obj.checkIndividualBlank = val;
            window.ReactNativeWebView.postMessage(JSON.stringify(obj));
          }
        </script>
        <style>
                      *{
            margin:0;
          }
          #questionnaireContainer{
              width:100% !important;
              text-align:center;
              /*padding:5px;*/
            }
    
            #questionnaireContainer table {
    
                border-collapse: collapse;
                font-size: 16px;
    
            }
            #questionnaireContainer table tr:first-child {
                font-weight: 700;
            }
            #questionnaireContainer table td,
            #questionnaireContainer table th {
                padding: 5px;
                line-height: 18px;
                margin:10px;
            }
            #questionnaireContainer img {
                display: inline-block;
                height: auto;
                max-width: 95%;
                max-height: 100%;
                object-fit:contain;
            }
    
            #quesInteractive {
              //width: 100% !important;
            }
    
            .img-container {
              text-align: center;
              width:"40px" ;
              height="40px";
            }
    
            .play {
              display: inline-block;
              background: transparent;
              box-sizing: border-box;
              width: 40px;
              height: 40px;
    
              border-color: transparent transparent transparent #F8651F;
              transition: 100ms all ease;
              cursor: pointer;
    
              // play state
              border-style: solid;
              border-width: 10px 0 10px 15px;
    
              &.paused {
                border-style: double;
                border-width: 0px 0 0px 25px;
              }
    
              &:hover {
                border-color: transparent transparent transparent #F8651F;
              }
            }
    
            #myImg {
              border-radius: 5px;
              cursor: pointer;
              transition: 0.3s;
            }
    
            .dropdown_button {
              font-size:24px;
            }
    
            /* Arrows in CSS */
            .arrow {
              border: solid black;
              border-width: 0 3px 3px 0;
              display: inline-block;
              padding: 4px;
              margin-left: 10px;
              margin-bottom: 5px;
            }
    
            .right {
              transform: rotate(-45deg);
              -webkit-transform: rotate(-45deg);
            }
    
            .left {
              transform: rotate(135deg);
              -webkit-transform: rotate(135deg);
            }
    
            .up {
              transform: rotate(-135deg);
              -webkit-transform: rotate(-135deg);
            }
    
            .down {
              transform: rotate(45deg);
              -webkit-transform: rotate(45deg);
            }
    
            /* The Modal (background) */
            .modal {
              display: none; /* Hidden by default */
              position: fixed; /* Stay in place */
              z-index: 1; /* Sit on top */
              padding-top: 100px; /* Location of the box */
              left: 0;
              top: 0;
              width: 100%; /* Full width */
              height: 100%; /* Full height */
              overflow: auto; /* Enable scroll if needed */
              background-color: rgb(0, 0, 0); /* Fallback color */
              background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
            }
    
            /* Modal Content (image) */
            .modal-content {
              margin: auto;
              display: block;
              width: 80%;
              max-width: 700px;
            }
    
            /* Caption of Modal Image */
            #caption {
              margin: auto;
              display: block;
              width: 80%;
              max-width: 700px;
              text-align: center;
              color: #ccc;
              padding: 10px 0;
              height: 150px;
            }
    
            /* Add Animation */
            .modal-content,
            #caption {
              -webkit-animation-name: zoom;
              -webkit-animation-duration: 0.6s;
              animation-name: zoom;
              animation-duration: 0.6s;
            }
    
            @-webkit-keyframes zoom {
              from {
                -webkit-transform: scale(0);
              }
              to {
                -webkit-transform: scale(1);
              }
            }
    
            @keyframes zoom {
              from {
                transform: scale(0);
              }
              to {
                transform: scale(1);
              }
            }
    
            /* The Close Button */
            .close {
              position: absolute;
              top: 15px;
              right: 35px;
              color: #f1f1f1;
              font-size: 40px;
              font-weight: bold;
              transition: 0.3s;
            }
    
            .close:hover,
            .close:focus {
              color: #bbb;
              text-decoration: none;
              cursor: pointer;
            }
    
            /* 100% Image Width on Smaller Screens */
            @media only screen and (max-width: 700px) {
              .modal-content {
                width: 100%;
              }
            }
    
    
    
                     #questionnaireContainer { font-size:24px;}
        </style>
      </head>
      <body style="width: 99%">
        <div
          dir="ltr"
          id="questionnaireContainer"
          class=""
          style="padding-left: 5px; padding-right: 5px"
        >
          <fieldset id="contentField" style="border: none">
          <span id=\"docs-internal-guid-9f50fb52-7fff-066b-4d9d-f9261ce19255\">Classify the following functions into three categories.<br></span><br><iframe id='quesInteractive' src='https://d2tl1spkm4qpax.cloudfront.net/Enrichment_Modules/html5/questions/TMP/TMP_dragAndDrop/src/index.html?dragZone=ADA_qcode_78594_1.png|1~ADA_qcode_78594_2.png|1~ADA_qcode_78594_3.png|1~ADA_qcode_78594_4.png|1~ADA_qcode_78594_5.png|1&categoryName=Even%20functions|Odd%20functions|Neither%20of%20the%20two&categoryAns=ADA_qcode_78594_2.png|ADA_qcode_78594_4.png~ADA_qcode_78594_3.png~ADA_qcode_78594_1.png|ADA_qcode_78594_5.png&displayAnswer=0' height='1200px' width='800px' frameborder='0' scrolling='no'></iframe>
          </fieldset>
        </div>
        <script type="text/javascript">
          $(document).ready(function () {
            console.log('Ready::::');
    
            var frame = document.getElementById('quesInteractive');
            if (frame) {
              frame.onload = function () {
                setTimeout(function () {
                  var win = frame.contentWindow;
                  try {
                    win.postMessage('checkGameComplete', '*');
                  } catch (ex) {
                    alert('error');
                  }
                }, 1000);
              };
            }
            // var iframe = document.getElementById("quesInteractive");
            // console.log("IFREAME:::",iframe);
            //  iframe.onload = function(){
            //      console.log("LOADED:",iframe.contentWindow.document.body.scrollHeight,'px')
            //       iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
            //   }
          });
    
          try {
            var eventMethod = window.addEventListener
              ? 'addEventListener'
              : 'attachEvent';
            var eventer = window[eventMethod];
            var messageEvent =
              eventMethod == 'attachEvent' ? 'onmessage' : 'message';
            var frame = document.getElementById('quesInteractive');
            // Listen to message from child window
            console.log('Frame:', frame);
            eventer(
              messageEvent,
              function (e) {
                console.log('MSG From Iframe Origin.............', e);
                console.log('MSG:::', e.data);
                // alert("MSG:::"+e);
                let obj = {};
                obj.type = 'IframeResponse';
                obj.response = e.data;
                //obj["iframeHeight"]=e.data.split("||||||")[1];
                //obj["iFrameAnswer"]=e.data.split("||||||")[0];
                if (!isNaN(e.data.split('||||||||')[1])) {
                  let newHeight = e.data.split('||||||||')[1];
    
                  if (newHeight > 0) {
                    newHeight = newHeight + 'px';
                    $('#quesInteractive').attr('height', newHeight);
                  } else if (newHeight == 0 && isNaN(newHeight)) {
                    alert(newHeight);
                    setTimeout(function () {
                      var win = frame.contentWindow;
                      try {
                        win.postMessage('checkGameComplete', '*');
                      } catch (ex) {
                        alert('error');
                      }
                    }, 1000);
                  }
                }
                window.webViewBridge.send(JSON.stringify(obj));
                if (
                  e.origin == 'http://mindspark-ei.s3.amazonaws.com' ||
                  e.origin == 'http://d2tl1spkm4qpax.cloudfront.net' ||
                  e.origin == 'mindspark-ei.s3.amazonaws.com' ||
                  e.origin == 'd2tl1spkm4qpax.cloudfront.net' ||
                  $('#offlineStatus').val() == '3' ||
                  $('#offlineStatus').val() == '4' ||
                  $('#offlineStatus').val() == '7' ||
                  e.origin == 'https://mindspark-ei.s3.amazonaws.com' ||
                  e.origin == 'https://d2tl1spkm4qpax.cloudfront.net'
                ) {
                  var response1 = '';
                  response1 = e.data;
                  if (response1.indexOf('||') != -1) {
                    dispalAnswerParam = '';
                    response1Array = response1.split('||');
                    result = parseInt(response1Array[0]);
                    $('#userResponse').val(response1Array[1]);
                    if (['', 'null', 'undefined'].indexOf(response1Array[2]) == -1)
                      $('#extraParameters').val(
                        response1Array[2].replace(/|~|/, '||')
                      );
                    if (typeof response1Array[3] !== 'undefined') {
                      dispalAnswerParam = response1Array[3];
                    }
                    if (result > 2) {
                      $.post(
                        'errorLog.php',
                        'params=' +
                          $('#quesform').find('input').serialize() +
                          '&type=3',
                        function (data) {}
                      );
                    }
                    console.log('Result:', result);
                    console.log('QTYPE:', newQues.quesType);
                    // calcAns(result, newQues.quesType);
                  } else if (response1.indexOf('frameHeight=') == 0) {
                    frameHeight = response1.replace('frameHeight=', '');
                    $('#quesInteractive').attr('height', frameHeight);
                  } else if (response1 == 'triggerSubmit') {
                    submitAnswer();
                  } else if (response1 == 'hideSubmit') {
                    $('#submitQuestion').hide();
                    $('#submitQuestion1').hide();
                    $('#submitQuestion2').hide();
                    $('#submit_bar').hide();
                    $('#submit_bar1').hide();
                    $('#submitArrow').hide();
                  } else {
                    var message;
                    try {
                      message = JSON.parse(response1);
                    } catch (error) {
                      message = {};
                    }
                    if (message.hasOwnProperty('subject')) {
                      switch (message.subject) {
                        case 'screenState': {
                          $('iframe').each(function () {
                            if (e.source === this.contentWindow) {
                              toggleFullscreen(this);
                              return false;
                            }
                          });
                          break;
                        }
                        case 'trail': {
                          constrTool.trail = message.content.trail;
                          break;
                        }
                      }
                    }
                  }
                }
              },
              false
            );
          } catch (ex) {
            alert('error in getting the response from interactive');
          }
    
          $(document).ready(function () {
            var images = $('img');
            console.log('images', images);
            //   for (i = 0; i < images.length; i++) {
            //    let viewer = new ImageViewer(images[i], { snapView:false });
    
            //   }
            const iframes = document.getElementsByTagName('iframe');
            console.log('Iframe List', iframes);
    
            for (var i = 0; i < iframes.length; i++) {
              var oldH = iframes[i].getAttribute('height').replace('px', '');
              var oldW = iframes[i].getAttribute('width').replace('px', '');
              console.log('Old Height:', oldH);
              console.log('Screen Width:', 372.57142857142856);
              //   var iframeWidthDiv = 372.57142857142856 * 0.90;
              var iframeWidthDiv = 372.57142857142856;
              console.log('Old width:', iframes[i].getAttribute('width'));
              let width = 372.57142857142856;
    
              //   var iframeWidth= iframeWidthDiv -(iframeWidthDiv * 0.025);
              var iframeWidth = iframeWidthDiv;
              var newH = oldH * (iframeWidth / oldW);
    
              console.log('New Height:', newH);
              iframes[i].setAttribute('height', newH);
              iframes[i].setAttribute('width', iframeWidth);
    
              let obj = {};
              obj.iframe = {
                NewHeight: newH + '',
                NewWidth: iframeWidth,
                oldHVal: oldH,
                oldWVal: oldW,
                totalWidth: 372.57142857142856,
              };
              //   alert(JSON.stringify(obj.iframe))
              //window.ReactNativeWebView.postMessage(JSON.stringify(obj));
              //TODO:ADD THIS if needed for checking height and width
              //alert(JSON.stringify(obj));
            }
          });
        </script>
      </body>
    </html>
    `;
};

export default htmlData;
