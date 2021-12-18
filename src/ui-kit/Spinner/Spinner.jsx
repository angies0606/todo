import CircularProgress from '@mui/material/CircularProgress';

function Spinner({
  className = ''
}) {

  return (
    <>
      <CircularProgress
        variant='indeterminate'
        color='primary'
        style={{
          height: 20,
          width: 20
        }}
        className={className}
      />
    </>
  )
}

export default Spinner;
