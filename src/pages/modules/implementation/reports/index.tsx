import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from './report.module.css';
import IframeResizer from 'iframe-resizer-react';
import { getHTMLReport, getSpecificationList } from '~/api/html-report';
import { Sidebar } from '~/components/sidebar';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import classNames from 'classnames';
import { Header } from '~/components/header';
import error from 'next/error';

const PortmanReport: NextPage = () => {
  const [html, setHTML] = useState({ __html: '<h1>Cargando...</h1>' });
  const [specList, setSpecList] = useState<string[]>();
  const [selectedFile, setSelectedFile] = useState<string>();

  useEffect(() => {
    async function loadSpecList() {
      const response = await getSpecificationList({ service: 'portman' });
      if (response) {
        setSpecList(response);
      }
      if (response && response.length > 0) {
        setSelectedFile(response[0]);
      }
      console.log(response);
    }
    void loadSpecList();
  }, []);

  useEffect(() => {
    async function createMarkup(filename?: string) {
      if (filename === undefined) {
        return;
      }

      try {
        const resizer = `!function(a){if("undefined"!=typeof window){var r=!0,P="",u=0,c="",s=null,D="",d=!1,j={resize:1,click:1},l=128,q=!0,f=1,n="bodyOffset",m=n,H=!0,W="",h={},g=32,B=null,p=!1,v=!1,y="[iFrameSizer]",J=y.length,w="",U={max:1,min:1,bodyScroll:1,documentElementScroll:1},b="child",V=!0,X=window.parent,T="*",E=0,i=!1,Y=null,O=16,S=1,K="scroll",M=K,Q=window,G=function(){x("onMessage function not defined")},Z=function(){},$=function(){},_={height:function(){return x("Custom height calculation function not defined"),document.documentElement.offsetHeight},width:function(){return x("Custom width calculation function not defined"),document.body.scrollWidth}},ee={},te=!1;try{var ne=Object.create({},{passive:{get:function(){te=!0}}});window.addEventListener("test",ae,ne),window.removeEventListener("test",ae,ne)}catch(e){}var oe,o,I,ie,N,A,C={bodyOffset:function(){return document.body.offsetHeight+ye("marginTop")+ye("marginBottom")},offset:function(){return C.bodyOffset()},bodyScroll:function(){return document.body.scrollHeight},custom:function(){return _.height()},documentElementOffset:function(){return document.documentElement.offsetHeight},documentElementScroll:function(){return document.documentElement.scrollHeight},max:function(){return Math.max.apply(null,e(C))},min:function(){return Math.min.apply(null,e(C))},grow:function(){return C.max()},lowestElement:function(){return Math.max(C.bodyOffset()||C.documentElementOffset(),we("bottom",Te()))},taggedElement:function(){return be("bottom","data-iframe-height")}},z={bodyScroll:function(){return document.body.scrollWidth},bodyOffset:function(){return document.body.offsetWidth},custom:function(){return _.width()},documentElementScroll:function(){return document.documentElement.scrollWidth},documentElementOffset:function(){return document.documentElement.offsetWidth},scroll:function(){return Math.max(z.bodyScroll(),z.documentElementScroll())},max:function(){return Math.max.apply(null,e(z))},min:function(){return Math.min.apply(null,e(z))},rightMostElement:function(){return we("right",Te())},taggedElement:function(){return be("right","data-iframe-width")}},re=(oe=Ee,N=null,A=0,function(){var e=Date.now(),t=O-(e-(A=A||e));return o=this,I=arguments,t<=0||O<t?(N&&(clearTimeout(N),N=null),A=e,ie=oe.apply(o,I),N||(o=I=null)):N=N||setTimeout(Oe,t),ie});k(window,"message",function(t){var n={init:function(){W=t.data,X=t.source,se(),q=!1,setTimeout(function(){H=!1},l)},reset:function(){H?R("Page reset ignored by init"):(R("Page size reset by host page"),Me("resetPage"))},resize:function(){L("resizeParent","Parent window requested size check")},moveToAnchor:function(){h.findTarget(i())},inPageLink:function(){this.moveToAnchor()},pageInfo:function(){var e=i();R("PageInfoFromParent called from parent: "+e),$(JSON.parse(e)),R(" --")},message:function(){var e=i();R("onMessage called from parent: "+e),G(JSON.parse(e)),R(" --")}};function o(){return t.data.split("]")[1].split(":")[0]}function i(){return t.data.slice(t.data.indexOf(":")+1)}function r(){return t.data.split(":")[2]in{true:1,false:1}}function e(){var e=o();e in n?n[e]():("undefined"==typeof module||!module.exports)&&"iFrameResize"in window||window.jQuery!==a&&"iFrameResize"in window.jQuery.prototype||r()||x("Unexpected message ("+t.data+")")}y===(""+t.data).slice(0,J)&&(!1===q?e():r()?n.init():R('Ignored message of type "'+o()+'". Received before initialization.'))}),k(window,"readystatechange",Ne),Ne()}function ae(){}function k(e,t,n,o){e.addEventListener(t,n,!!te&&(o||{}))}function ue(e){return e.charAt(0).toUpperCase()+e.slice(1)}function ce(e){return y+"["+w+"] "+e}function R(e){p&&"object"==typeof window.console&&console.log(ce(e))}function x(e){"object"==typeof window.console&&console.warn(ce(e))}function se(){function e(e){return"true"===e}function t(e,t){return"function"==typeof e&&(R("Setup custom "+t+"CalcMethod"),_[t]=e,e="custom"),e}{var n;n=W.slice(J).split(":"),w=n[0],u=a===n[1]?u:Number(n[1]),d=a===n[2]?d:e(n[2]),p=a===n[3]?p:e(n[3]),g=a===n[4]?g:Number(n[4]),r=a===n[6]?r:e(n[6]),c=n[7],m=a===n[8]?m:n[8],P=n[9],D=n[10],E=a===n[11]?E:Number(n[11]),h.enable=a!==n[12]&&e(n[12]),b=a===n[13]?b:n[13],M=a===n[14]?M:n[14],v=a===n[15]?v:e(n[15]),R("Initialising iFrame ("+window.location.href+")"),"iFrameResizer"in window&&Object===window.iFrameResizer.constructor&&(n=window.iFrameResizer,R("Reading data from page: "+JSON.stringify(n)),Object.keys(n).forEach(de,n),G="onMessage"in n?n.onMessage:G,Z="onReady"in n?n.onReady:Z,T="targetOrigin"in n?n.targetOrigin:T,m="heightCalculationMethod"in n?n.heightCalculationMethod:m,M="widthCalculationMethod"in n?n.widthCalculationMethod:M,m=t(m,"height"),M=t(M,"width"))}function o(e){F(0,0,e.type,e.screenY+":"+e.screenX)}function i(e,t){R("Add event listener: "+t),k(window.document,e,o)}R("TargetOrigin for parent set to: "+T),le("margin",function(e,t){-1!==t.indexOf("-")&&(x("Negative CSS value ignored for "+e),t="");return t}("margin",c=a===c?u+"px":c)),le("background",P),le("padding",D),(n=document.createElement("div")).style.clear="both",n.style.display="block",n.style.height="0",document.body.appendChild(n),he(),ge(),document.documentElement.style.height="",document.body.style.height="",R('HTML & body height set to "auto"'),R("Enable public methods"),Q.parentIFrame={autoResize:function(e){return!0===e&&!1===r?(r=!0,pe()):!1===e&&!0===r&&(r=!1,fe("remove"),null!==s&&s.disconnect(),clearInterval(B)),F(0,0,"autoResize",JSON.stringify(r)),r},close:function(){F(0,0,"close")},getId:function(){return w},getPageInfo:function(e){"function"==typeof e?($=e,F(0,0,"pageInfo")):($=function(){},F(0,0,"pageInfoStop"))},moveToAnchor:function(e){h.findTarget(e)},reset:function(){Ie("parentIFrame.reset")},scrollTo:function(e,t){F(t,e,"scrollTo")},scrollToOffset:function(e,t){F(t,e,"scrollToOffset")},sendMessage:function(e,t){F(0,0,"message",JSON.stringify(e),t)},setHeightCalculationMethod:function(e){m=e,he()},setWidthCalculationMethod:function(e){M=e,ge()},setTargetOrigin:function(e){R("Set targetOrigin: "+e),T=e},size:function(e,t){L("size","parentIFrame.size("+((e||"")+(t?","+t:""))+")",e,t)}},!0===v&&(i("mouseenter","Mouse Enter"),i("mouseleave","Mouse Leave")),pe(),h=function(){function n(e){var e=e.getBoundingClientRect(),t={x:window.pageXOffset===a?document.documentElement.scrollLeft:window.pageXOffset,y:window.pageYOffset===a?document.documentElement.scrollTop:window.pageYOffset};return{x:parseInt(e.left,10)+parseInt(t.x,10),y:parseInt(e.top,10)+parseInt(t.y,10)}}function o(e){var e=e.split("#")[1]||e,t=decodeURIComponent(e),t=document.getElementById(t)||document.getElementsByName(t)[0];a===t?(R("In page link (#"+e+") not found in iFrame, so sending to parent"),F(0,0,"inPageLink","#"+e)):(t=n(t=t),R("Moving to in page link (#"+e+") at x: "+t.x+" y: "+t.y),F(t.y,t.x,"scrollToOffset"))}function e(){var e=window.location.hash,t=window.location.href;""!==e&&"#"!==e&&o(t)}function t(){Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'),function(e){"#"!==e.getAttribute("href")&&k(e,"click",function(e){e.preventDefault(),o(this.getAttribute("href"))})})}function i(){Array.prototype.forEach&&document.querySelectorAll?(R("Setting up location.hash handlers"),t(),k(window,"hashchange",e),setTimeout(e,l)):x("In page linking not fully supported in this browser! (See README.md for IE8 workaround)")}h.enable?i():R("In page linking not enabled");return{findTarget:o}}(),L("init","Init message from host page"),Z()}function de(e){var t=e.split("Callback");2===t.length&&(this[t="on"+t[0].charAt(0).toUpperCase()+t[0].slice(1)]=this[e],delete this[e],x("Deprecated: '"+e+"' has been renamed '"+t+"'. The old method will be removed in the next major version."))}function le(e,t){a!==t&&""!==t&&"null"!==t&&R("Body "+e+' set to "'+(document.body.style[e]=t)+'"')}function t(n){var e={add:function(e){function t(){L(n.eventName,n.eventType)}ee[e]=t,k(window,e,t,{passive:!0})},remove:function(e){var t=ee[e];delete ee[e],window.removeEventListener(e,t,!1)}};n.eventNames&&Array.prototype.map?(n.eventName=n.eventNames[0],n.eventNames.map(e[n.method])):e[n.method](n.eventName),R(ue(n.method)+" event listener: "+n.eventType)}function fe(e){t({method:e,eventType:"Animation Start",eventNames:["animationstart","webkitAnimationStart"]}),t({method:e,eventType:"Animation Iteration",eventNames:["animationiteration","webkitAnimationIteration"]}),t({method:e,eventType:"Animation End",eventNames:["animationend","webkitAnimationEnd"]}),t({method:e,eventType:"Input",eventName:"input"}),t({method:e,eventType:"Mouse Up",eventName:"mouseup"}),t({method:e,eventType:"Mouse Down",eventName:"mousedown"}),t({method:e,eventType:"Orientation Change",eventName:"orientationchange"}),t({method:e,eventType:"Print",eventNames:["afterprint","beforeprint"]}),t({method:e,eventType:"Ready State Change",eventName:"readystatechange"}),t({method:e,eventType:"Touch Start",eventName:"touchstart"}),t({method:e,eventType:"Touch End",eventName:"touchend"}),t({method:e,eventType:"Touch Cancel",eventName:"touchcancel"}),t({method:e,eventType:"Transition Start",eventNames:["transitionstart","webkitTransitionStart","MSTransitionStart","oTransitionStart","otransitionstart"]}),t({method:e,eventType:"Transition Iteration",eventNames:["transitioniteration","webkitTransitionIteration","MSTransitionIteration","oTransitionIteration","otransitioniteration"]}),t({method:e,eventType:"Transition End",eventNames:["transitionend","webkitTransitionEnd","MSTransitionEnd","oTransitionEnd","otransitionend"]}),"child"===b&&t({method:e,eventType:"IFrame Resized",eventName:"resize"})}function me(e,t,n,o){return t!==e&&(e in n||(x(e+" is not a valid option for "+o+"CalculationMethod."),e=t),R(o+' calculation method set to "'+e+'"')),e}function he(){m=me(m,n,C,"height")}function ge(){M=me(M,K,z,"width")}function pe(){var e;!0===r?(fe("add"),e=g<0,window.MutationObserver||window.WebKitMutationObserver?e?ve():s=function(){function t(e){function t(e){!1===e.complete&&(R("Attach listeners to "+e.src),e.addEventListener("load",i,!1),e.addEventListener("error",r,!1),u.push(e))}"attributes"===e.type&&"src"===e.attributeName?t(e.target):"childList"===e.type&&Array.prototype.forEach.call(e.target.querySelectorAll("img"),t)}function o(e){R("Remove listeners from "+e.src),e.removeEventListener("load",i,!1),e.removeEventListener("error",r,!1),u.splice(u.indexOf(e),1)}function n(e,t,n){o(e.target),L(t,n+": "+e.target.src)}function i(e){n(e,"imageLoad","Image loaded")}function r(e){n(e,"imageLoadFailed","Image load failed")}function a(e){L("mutationObserver","mutationObserver: "+e[0].target+" "+e[0].type),e.forEach(t)}var u=[],c=window.MutationObserver||window.WebKitMutationObserver,s=function(){var e=document.querySelector("body");return s=new c(a),R("Create body MutationObserver"),s.observe(e,{attributes:!0,attributeOldValue:!1,characterData:!0,characterDataOldValue:!1,childList:!0,subtree:!0}),s}();return{disconnect:function(){"disconnect"in s&&(R("Disconnect body MutationObserver"),s.disconnect(),u.forEach(o))}}}():(R("MutationObserver not supported in this browser!"),ve())):R("Auto Resize disabled")}function ve(){0!==g&&(R("setInterval: "+g+"ms"),B=setInterval(function(){L("interval","setInterval: "+g)},Math.abs(g)))}function ye(e,t){return t=t||document.body,t=null===(t=document.defaultView.getComputedStyle(t,null))?0:t[e],parseInt(t,10)}function we(e,t){for(var n,o=t.length,i=0,r=ue(e),a=Date.now(),u=0;u<o;u++)i<(n=t[u].getBoundingClientRect()[e]+ye("margin"+r,t[u]))&&(i=n);return a=Date.now()-a,R("Parsed "+o+" HTML elements"),R("Element position calculated in "+a+"ms"),O/2<(a=a)&&R("Event throttle increased to "+(O=2*a)+"ms"),i}function e(e){return[e.bodyOffset(),e.bodyScroll(),e.documentElementOffset(),e.documentElementScroll()]}function be(e,t){var n=document.querySelectorAll("["+t+"]");return 0===n.length&&(x("No tagged elements ("+t+") found on page"),document.querySelectorAll("body *")),we(e,n)}function Te(){return document.querySelectorAll("body *")}function Ee(e,t,n,o){function i(){e in{init:1,interval:1,size:1}||!(m in U||d&&M in U)?e in{interval:1}||R("No change in size detected"):Ie(t)}function r(e,t){return!(Math.abs(e-t)<=E)}n=a===n?C[m]():n,o=a===o?z[M]():o,r(f,n)||d&&r(S,o)||"init"===e?(Se(),F(f=n,S=o,e)):i()}function Oe(){A=Date.now(),N=null,ie=oe.apply(o,I),N||(o=I=null)}function L(e,t,n,o){i&&e in j?R("Trigger event cancelled: "+e):(e in{reset:1,resetPage:1,init:1}||R("Trigger event: "+t),("init"===e?Ee:re)(e,t,n,o))}function Se(){i||(i=!0,R("Trigger event lock on")),clearTimeout(Y),Y=setTimeout(function(){i=!1,R("Trigger event lock off"),R("--")},l)}function Me(e){f=C[m](),S=z[M](),F(f,S,e)}function Ie(e){var t=m;m=n,R("Reset trigger event: "+e),Se(),Me("reset"),m=t}function F(e,t,n,o,i){!0===V&&(a===i?i=T:R("Message targetOrigin: "+i),R("Sending message to host page ("+(e=w+":"+(e+":"+t)+":"+n+(a===o?"":":"+o))+")"),X.postMessage(y+e,i))}function Ne(){"loading"!==document.readyState&&window.parent.postMessage("[iFrameResizerChild]Ready","*")}}();
    `;

        const apiResponse = await getHTMLReport({
          service: 'portman',
          filename: filename,
        }).then((response) => {
          if (typeof response !== 'string') throw error;
          const parsedResponse = response
            .replace(/height:\s*100%\s*;/, '')
            .replace('<head>', `<head><script>${resizer}</script>`)
            .replace('Newman Run Dashboard', '');
          return parsedResponse;
        });
        console.log(apiResponse);
        setHTML({ __html: apiResponse });
      } catch (error) {
        console.error(error);
        setHTML({ __html: '<h1>Hubo un error al cargar el reporte</h1>' });
      }
    }

    void createMarkup(selectedFile);
  }, [selectedFile]);

  return (
    <>
      <Head>
        <title>AxPI Scoring | Informes de Implementación</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.container}>
        <Header />
        {specList?.length === 0 && (
          <div className={styles.noSpecs}>
            <h1>No hay especificaciones cargadas</h1>
            <p>
              Para cargar una especificación, acceda a la sección
              <b> Validar diseño</b> o<b> Validar implementación</b> desde la
              <b> página de inicio</b>.
            </p>
          </div>
        )}
        {specList && specList?.length > 0 && (
          <div className={styles.content}>
            <div>
              <Sidebar>
                <ScrollArea>
                  <div className={styles.sidebarItems}>
                    {specList?.map((spec) => (
                      <div
                        key={spec}
                        className={classNames(
                          styles.sidebarItem,
                          spec === selectedFile && styles.sidebarItemSelected
                        )}
                        onClick={() => setSelectedFile(spec)}
                      >
                        {spec}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Sidebar>
            </div>
            <main className={styles.main}>
              <IframeResizer
                // log
                heightCalculationMethod='lowestElement'
                srcDoc={html.__html}
                className={styles.iframe}
                checkOrigin={false}
                width='100%'
              />
            </main>
          </div>
        )}
      </div>
    </>
  );
};

export default PortmanReport;
