/**
 * song info div manager
 */

var sisManager = (function($){
	
	var r = {};
	
	r.filledSongMarkup = "<img src='${cover}'/>"+
	"<div id='songName'>"+
	"<p>${artist}</p><br/><br/><br/><p>${song}</p><br/><br/>"+
	"<div>"+
	"<ul><li><a>></a></li><li style='margin-left: 8px;'><a>+</a></li></ul>"
	+"</div></div>";
	
	r.emptySongMarkup = "<h3>This node is empty</h3><br/>"+
	"<button>Save a song</button>"
	
	r.stationMarkup = "<div class='station' id=st_${id} style='margin-left:${mleft}px;"+"margin-top:${mright}px;"+"'></div>"
	
	/**
	 * register templates
	 */		
	$.template("filledSongMarkup", r.validSongMarkup);
	$.template("emptySongMarkup", r.emptySongMarkup);
	$.template("stationMarkup", r.stationMarkup);
	
	return r;
})(jQuery);

var $station = function(id,mleft,mright){
	
	var el = $.tmpl("stationMarkup", {id:id,mleft:mleft, mright:mright});
	
	el.mouseover(function(e){
		
	});
	
	this.el = el;
	this.id = id;
	this.songData = {};
	
}

/**
 * managers of all station divs
 */
var $stManager = (function($){
	
	var r = {};
	
	var container,stNumber;
	var stations = [];
	
	r.init = function(con,s){
		this.container = con;
		this.stNumber = s;
	}
	
	r.setContainer = function(dom){
		this.container = dom;
	}
	
	r.getContainer = function(){
		return this.container;
	}
	
	r.getStNumber = function(){
		return this.stNumber;
	}
	
	r.setStNumber = function(s){
		this.stNumber = s;
	}
	
	
	return r;
})(jQuery);
