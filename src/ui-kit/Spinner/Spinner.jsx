import CircularProgress from '@mui/material/CircularProgress';

function Spinner({
  className = '',
  spinnerSize
}) {

  return (
    <>
      <CircularProgress
        variant='indeterminate'
        color='warning'
        style={spinnerSize}
        className={className}
      />
    </>
  )
}

export default Spinner;
