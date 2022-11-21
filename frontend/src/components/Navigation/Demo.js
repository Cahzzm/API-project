
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session'

const Demo = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleClick = (e) => {
        e.preventDefault()

        const credential = 'Demo-lition';
        const password = 'password'

        dispatch(sessionActions.login({ credential, password }))

        history.push("/")

    }

    return (
        <button id='demo-btn-l' onClick={handleClick} type='submit'>Demo</button>
    )
}

export default Demo;
