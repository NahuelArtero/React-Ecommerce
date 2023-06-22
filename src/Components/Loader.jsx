import Spinner from 'react-bootstrap/Spinner';

const styles = {
  loader:{
    position: 'fixed',
    top: '50%' ,
    left: '50%'
  }
};

function Loader({ loading, children }) {
    if (loading) {
      return (
        <div className="spinner" style={ styles.loader}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    } else {
      return <>{children}</>;
    }
  }
  
  export default Loader;