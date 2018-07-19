const getCurryStyle = (oEl) => {
  var oStyle = oEl.currentStyle ? oEl.currentStyle : window.getComputedStyle(oEl, false);
  return oStyle;
}

export default{
  getCurryStyle
}
