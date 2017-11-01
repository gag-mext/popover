import  '../style';
import React from 'react';
import Tooltip from 'rc-tooltip';
import Item from './Item';

function recursiveCloneChildren(children, cb = (ch: any, _i: number) => ch) {
  return React.Children.map(children, (child, index) => {
    const newChild = cb(child, index);
    if (newChild && newChild.props && newChild.props.children) {
      return React.cloneElement(newChild, {}, recursiveCloneChildren(newChild.props.children, cb));
    }
    return newChild;
  });
}

class Popover extends React.Component {
  static Item = Item;

  render() {
    const { overlay, onSelect = () => {} } = this.props;

    const overlayNode = recursiveCloneChildren(overlay, (child, index) => {
      const extraProps: any = { firstItem: false };
      if (child && child.type && child.type.myName === 'PopoverItem' && !child.props.disabled) {
        extraProps.onClick = () => onSelect(child, index);
        extraProps.firstItem = (index === 0);
        return React.cloneElement(child, extraProps);
      }
      return child;
    });
    return <Tooltip {...this.props} overlay={overlayNode} />;
  }
}
Popover.defaultProps = {
  prefixCls: 'am-popover',
  placement: 'bottomRight',
  popupAlign: { overflow: { adjustY: 0, adjustX: 0 } },
  trigger: ['click'],
};
Popover.propTypes = {
  onSelect:React.PropTypes.func,
  renderOverlayComponent:React.PropTypes.func,
  overlay:React.PropTypes.any,
  disabled:React.PropTypes.bool,
  name: React.PropTypes.string,
  style:React.PropTypes.any,
  triggerStyle:React.PropTypes.any,
  overlayStyle:React.PropTypes.any,
  contextStyle:React.PropTypes.any,
  children:React.PropTypes.any,
  /** web only */
  prefixCls: React.PropTypes.string,
};
Popover.displayName = "Popover";
module.exports=Popover;
