import { useSnackbar } from 'react-simple-snackbar'

const Toastify = () => {
    const color = { success: '#c5f7dc', error: '#ffcfcb', warn: '#ffe8c3', info: '#cde2ff', custom: '#e9e9eb' }
    const border = { success: '#3bc27a', error: '#e9594c', warn: '#e79e29', info: '#3d84e5', custom: '#707683' }

    const options = (type) => ({
        position: 'bottom-right',
        style: {
            color:'black',
            background: color[type],
            borderLeft:`6px solid ${border[type]}`
        },
        closeStyle: {
            color:'black'
        }
    })

    const [ success ] = useSnackbar(options('success'))
    const [ error ] = useSnackbar(options('error'))
    const [ warn ] = useSnackbar(options('warn'))
    const [ info ] = useSnackbar(options('info'))
    const [ custom ] = useSnackbar(options('custom'))

    return {
        success, error, warn, info, custom,
    }
}

export default Toastify;

