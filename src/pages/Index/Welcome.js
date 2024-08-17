import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Typography } from 'antd';
import { LikeFilled as IconLikeFilled } from '@ant-design/icons';
import style from './welcome.sass';
import { setLikeLen } from './reducers/reducers';
import WelcomeSvgComponent from './images/welcome.component.svg';

/* redux selector */
const selector = createStructuredSelector({
  likeLen: ({ index }) => index.likeLen
});

function Welcome(props) {
  const { likeLen } = useSelector(selector);
  const dispatch = useDispatch();

  // 点赞
  function handleZanClick(event) {
    (likeLen + 1) |> setLikeLen(#) |> dispatch(#);
  }

  return (
    <Typography>
      <Typography.Title>
        欢迎
        <WelcomeSvgComponent className={ style.welcome } />
      </Typography.Title>
      <Typography.Paragraph>
        如果你喜欢，你可以点个赞。
      </Typography.Paragraph>
      <div className={ style.box }>
        <IconLikeFilled className={ style.zan } role="button" onClick={ handleZanClick } />
        <span className={ style.len }>{ likeLen }</span>
      </div>
      <img className={ style.img } src={ require('./images/1R5031O0-17.jpg') } />
    </Typography>
  );
}

export default Welcome;