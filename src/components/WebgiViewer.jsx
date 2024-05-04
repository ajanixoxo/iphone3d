import React,
{
    useRef,
    useState,
    useCallback,
    forwardRef,
    useImperativeHandle,
    useEffect

} from 'react'
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    GammaCorrectionPlugin,
    mobileAndTabletCheck,
  
  


} from "webgi";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {scrollAnimation} from '../lib/scroll-animation'
 gsap.registerPlugin(ScrollTrigger);
 const WebgiViewer = forwardRef((props, ref) => {
    const canvasRef = useRef(null)
    const [viewerRef, setViewerRef] = useState(null);
    const [targerRef, setTargetRef] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [positionRef, setPositionRef] = useState(null);
    const [isMobile, setIsMobile] = useState(null);
    useImperativeHandle(ref, () => ({
        triggerPreview(){
           gsap.to(positionRef, {
            x:13.04,
            y:-2.01,
            z:2.29,
            duration:2,
            onUpdate: () => {
                viewerRef.setDirty();
                cameraRef.positionTargetUpdaed(true)
            }
           })
           gsap.to(targerRef, {x:0.11, y:0.11, z:0.0, duration:2})
        }
    }))
    const memoizedScrollAnimation = useCallback((position, target, isMobile, onUpdate) => {
               if(position && target && onUpdate){
                       scrollAnimation(position, target, isMobile, onUpdate);
               }
    }, [])
     const setupViewer = useCallback(async () => {
 
         
         const viewer = new ViewerApp({
              canvas: canvasRef.current,
         })
          setViewerRef(viewer)
          const isMobileTablet = mobileAndTabletCheck();
          setIsMobile(isMobileTablet)
         const manager = await viewer.addPlugin(AssetManagerPlugin)
 
           const camera = viewer.scene.activeCamera
           const position = camera.position;
           const target = camera.target;
           setCameraRef(camera)
           setPositionRef(position)
           setTargetRef(target)
         // Add plugins individually.
         await viewer.addPlugin(GBufferPlugin)
         await viewer.addPlugin(new ProgressivePlugin(32))
         await viewer.addPlugin(new TonemapPlugin(true))
         await viewer.addPlugin(GammaCorrectionPlugin)
         await viewer.addPlugin(SSRPlugin)
         await viewer.addPlugin(SSAOPlugin)
        
   
         
     
         viewer.renderer.refreshPipeline()
 
          await manager.addFromPath("/scene-black.glb");
         
          viewer.getPlugin(TonemapPlugin).config.clipBackground  = true;
 
          viewer.scene.activeCamera.setCameraOptions({controlsEnabled:false});

          if(isMobileTablet){
            position.set(-16.7, 1.17, 11.7);
            target.set(0, 1.37, 0);
            props.contentRef.current.clasName = "mobile-or-tablet"

          }
          
          window.scrollTo(0,0);
 
          let needsUpdate = true
           const onUpdate = () => {
             needsUpdate = true;
             viewer.setDirty()
           }
          viewer.addEventListener("preFrame", () => {
             if(needsUpdate) {
                 camera.positionTargetUpdated(true)
                 needsUpdate = false;
             }
                  
          })
            memoizedScrollAnimation(position, target,  isMobileTablet,  onUpdate)
       
         // const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin)
         // // Add plugins to the UI to see their settings.
         // uiPlugin.setupPlugins<IViewerPlugin>(TonemapPlugin, CanvasSnipperPlugin)
 
     }, []);
 
  useEffect(( )=> {
     setupViewer()
  }, [])
 
 
     return (
         <div id='webgi-canvas-container'>
          <canvas id='webgi-canvas' ref={canvasRef} />
 
 
         </div>
     )
 })
 

export default WebgiViewer