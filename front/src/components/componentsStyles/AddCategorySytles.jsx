import { makeStyles } from '@material-ui/styles';

export default makeStyles({
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',        
    },
    select: {
        width: '100%',   
    },
    image: {
        objectFit: 'cover',
        width: '100%',
        maxHeight: '300px',               
    }
});
