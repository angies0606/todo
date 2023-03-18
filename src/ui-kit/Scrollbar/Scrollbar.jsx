import ReactScrollbar from "react-scrollbars-custom";

function Scrollbar ({
  children,
  scrollerId,
  className,
  paddingBottom,
  background
}) {
  return (
    <ReactScrollbar
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
  
      scrollerProps={{
        renderer: props => {
          const {elementRef, style, ...restProps} = props;
          return <div
            {...restProps}
            ref={elementRef}
            id={scrollerId}
            style={{
              ...style,
              ...paddingBottom
            }}
          ></div>;
        }
      }}
      className={className}
      trackYProps={{
        renderer: props => {
          const { elementRef, style, ...restProps } = props;
          return <span {...restProps} ref={elementRef} style={{...style, ...background}} />;
        }
      }}
    >
      {children}
    </ReactScrollbar>
  )
}

export default Scrollbar;