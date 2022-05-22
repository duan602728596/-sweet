import { Fragment } from 'react';
import { useRoutes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FolderOpenOutlined as IconFolderOpenOutlined, PieChartOutlined as IconPieChartOutlined } from '@ant-design/icons';
import Main from '../../layouts/Main';
import Content from '../../layouts/Content';
import Sider from '../../layouts/Sider/index';
import Second from './Second';

const options = [
  {
    id: 'page-0',
    name: '导航菜单-0',
    icon: <IconPieChartOutlined />,
    url: '/Second'
  },
  {
    id: 'page-1',
    name: '导航菜单-1',
    url: '/Second/Page1'
  },
  {
    id: 'page-2',
    name: '导航菜单-2',
    icon: <IconFolderOpenOutlined />,
    children: [
      {
        id: 'page-2-0',
        name: '子导航-2-0',
        url: '/Second/Page2'
      },
      {
        id: 'page-2-1',
        name: '子导航-2-1',
        url: '/Second/Page3'
      }
    ]
  }
];

function Index(props) {
  const routes = useRoutes([
    { path: '/', element: <Second /> },
    { path: 'Page1', element: <Second /> },
    { path: 'Page2', element: <Second /> },
    { path: 'Page3', element: <Second /> }
  ]);

  return (
    <Fragment>
      <Helmet>
        <title>Webpack App - second</title>
      </Helmet>
      <Main>
        <Sider options={ options } />
        <Content>{ routes }</Content>
      </Main>
    </Fragment>
  );
}

export default Index;