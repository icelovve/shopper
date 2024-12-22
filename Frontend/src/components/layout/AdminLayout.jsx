import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import Sidebar from '../share/Sidebar';

const AdminLayout = ({ children,title }) => {
  return (
    <DocumentTitle title={title}>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <nav className="w-64 ">
          <Sidebar />
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
            {children}
        </main>
      </div>
    </DocumentTitle>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default AdminLayout;
