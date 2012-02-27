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
	
	r.stationMarkup = "<div class='station' id=st_${id} style='width:${width}px; height:${height}px; margin-left:${mleft}px;"+"margin-top:${mtop}px;"+"'></div>"
	
	/**
	 * register templates
	 */		
	$.template("filledSongMarkup", r.validSongMarkup);
	$.template("emptySongMarkup", r.emptySongMarkup);
	$.template("stationMarkup", r.stationMarkup);
	
	return r;
})(jQuery);

var $station = function(id,mleft,mtop){

	this.id = id;
	this.songData = {};
	this.mleft=mleft;
	this.mtop=mtop;
	
	this.width = 10;
	this.height = 10;
	return this;
}

// $station.prototype.updateViewForResolution(w,h){
// 	
// }
$station.prototype.draw = function($con, mleftProportion, mtopProportion){
	
	var id=this.id;
	var ml = this.mleft;
	var mt = this.mtop;
	
	var w = this.width*mleftProportion;
	var h = this.height*mtopProportion;
	
	console.log(mleftProportion)
	var view = $.tmpl("stationMarkup", {width:w, height: h,id:id, mleft:ml*mleftProportion, mtop:mt*mtopProportion});
	view.mouseover(function(e){
		console.log("div_",id);
	});
	
	this.view = view;
	
	$con.prepend(this.view);
}
/**
 * managers of all station divs
 */

var local_stations = [
	new $station(1,30,24),
	new $station(2,54,55),
	new $station(3,271,47),
	new $station(4,17,74),
	new $station(5,17,85),
	new $station(6,17,97),
	new $station(7,17,108),
	new $station(8,247,39),
	new $station(9,211,116),
	new $station(10,152,93),
	new $station(11,114,156),
	new $station(12,114,173),
	new $station(13,333,19),
	new $station(14, 355,35),
	new $station(15,396,25),
	new $station(16,408,25),
	new $station(17,458,37),
	new $station(18,561,36)
];

var $stManager = (function($){
	
	var r = {};
	
	var container,stNumber;
	var stations = [];
	
	r.init = function(con,s){
		
		
		this.container = con;
		this.stNumber = s;
		this.loadStations(local_stations);
	}
	
	r.loadStations = function(sData){
		/**
		 * load all station objects
		 * el is station object implemented above
		 */
		
		//clear last stations object
		stations = [];
		
		var c = this.container;
		var that = this;
		var wp = canvasManager.wProportion;
		var hp = canvasManager.hProportion;
		
		$(sData).each(function(idx,el){
			el.draw(c,wp,hp);
			stations.push(el);
		});
		console.log("stations array: ", stations)
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

var canvasManager = (function(){
	
	var result = {};
	
	var orgScreenWidth = 1366;
	var orgScreenHeight = 768;
	
	var screenWidth = screen.width;
	var screenHeight = screen.height;
	
	result.wProportion = screenWidth/orgScreenWidth;
	result.hProportion = screenHeight/orgScreenHeight;
	
	result.init = function(id, width, height){ //default options, exception handling
		
		this.id = id;
		this.width = width;
		this.height = height;
		
		var c = document.getElementById(id);
		c.width = width;
		c.height = height;
		this.canvas = c;
		this.ctx = this.canvas.getContext("2d");
	}
	
	result.loadImgFromSource = function(imgSrc){
		var img = new Image();
		img.src = imgSrc;
		this.imgSource = imgSrc;
		
		var that = this;
		img.onload = function(){
			that.canvas.width = this.width*that.wProportion;
			that.canvas.height = this.height*that.hProportion;
			
			that.ctx.drawImage(this,0,0, this.width*that.wProportion,this.height*that.hProportion);
		}
	}
	
	result.draw = function(m,t){
		setInterval(m,t);
	}
	
	return result;
})(canvasManager || {});

$(document).ready(function(){
	
	canvasManager.init("canvas", screen.width/2, screen.height/2);
	canvasManager.loadImgFromSource("cb2.png");
	
	$stManager.init($("#cont"),3);
});
