import DocumentTitle from 'react-document-title'
import PropTypes from 'prop-types';


const AuthLayout = ({children}) => {
    return (
        <DocumentTitle title='login - shopper'>
                {children}
        </DocumentTitle>
    )
}

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
}

export default AuthLayout
