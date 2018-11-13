//react/utils/Functions.js
var Functions = {
  getMetaContent: function(name) {
    var metas = document.getElementsByTagName('meta');

    console.log("!!!!!!!!");
    console.log(metas);

    for (var i=0; i<metas.length; i++) {
      console.log(metas[i]);
      if (metas[i].getAttribute("name") == name) {
        return metas[i].getAttribute("content");
      }
    }

    return "pfEgIlNEp9ov4kuKgJtzDJ7vLIvTp2T7e4F6605o5b+HM/20gYpCGTXuXFxPa5JX4yBfbW3pz1lVbVKGWujy/A==";
  }
}

module.exports = Functions;
