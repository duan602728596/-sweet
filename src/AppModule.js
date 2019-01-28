import Layout from './assembly/Layout/index';

export default {
  name: 'AppModule',
  render(): Vue.VNode{
    return (
      <div class="app" id="app">
        <Layout />
      </div>
    );
  }
};