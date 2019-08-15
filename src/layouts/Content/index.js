import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from 'ant-design-vue';
import style from './style.sass';

/**
 * layout - Content
 * 页面内容
 * 组件用于展示页面的内容
 * 默认padding为8px
 */
@Component
class Content extends Vue {
  render() {
    return (
      <Layout.Content class={ style.content }>
        { this.$slots.default }
      </Layout.Content>
    );
  }
}

export default Content;