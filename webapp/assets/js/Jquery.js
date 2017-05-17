$(document).ready(function(){

$("#country_id, #country_id2").selectbox();
$('[data-toggle="tooltip"]').tooltip(); 

$(function() {
	$('.close').click(function(){
		$(this).parent().fadeOut(600);
	});
});

$(function() {
	$('.userIntract .open').click(function(){
		$(this).parent().find('.txtOpen').slideDown(600);
	});
});

$(function() {

	$(".usrIsml").hover(
	function(){
		$(this).parent().find('span img').fadeIn(600);
	},
	function(){
		$(this).parent().find('span img').fadeOut(200);
	}
	 
	);
	
	$(".showProfInfo").hover(
	function(){
		$(this).parent().find('.profInfo').fadeIn(600);
	},
	function(){
		$(this).parent().find('.profInfo').fadeOut(200);
	}
	 
	);

});

$(function() {
	// Open Settings
	$('.openSet').click(function(){
		$(this).parent().find('.openSetg').fadeIn(600);
	});
	$(document).click(function(event) { 
		if(!$(event.target).closest('.openSet,.openSetg').length) {
			if($('.openSet,.openSetg').is(":visible")) {
				$('.openSetg').hide()
			}
		}        
	})
	
	// Open Notification
	$('.openNot').click(function(){
		$(this).parent().find('.notifDisp').fadeIn(600);
	});
	$(document).click(function(event) { 
		if(!$(event.target).closest('.notifDisp,.openNot').length) {
			if($('.notifDisp,.openNot').is(":visible")) {
				$('.notifDisp').hide()
			}
		}        
	})	
	
	// Open Change Password
	$('.chg_pwd').click(function(){
		$('#show_chgName').fadeOut(200);
		$('#show_chgProfPic').fadeOut(600);
		$('#ShowPWD').fadeIn(600);
	});
	$(document).click(function(event) { 
		if(!$(event.target).closest('.openSet,.openSetg, #ShowPWD').length) {
			if($('.openSet,.openSetg, #ShowPWD').is(":visible")) {
				$('#ShowPWD').hide()
			}
		}        
	})//End
	
	// Open Change Password
	$('.chg_name').click(function(){
		$('#ShowPWD').fadeOut(200);
		$('#show_chgProfPic').fadeOut(600);
		$('#show_chgName').fadeIn(600);
	});
	$(document).click(function(event) { 
		if(!$(event.target).closest('.openSet,.openSetg, #show_chgName').length) {
			if($('.openSet,.openSetg, #show_chgName').is(":visible")) {
				$('#show_chgName').hide()
			}
		}        
	})//END
	
	// Open Change Profile Picture
	$('.chg_prof_pic').click(function(){
		$('#ShowPWD').fadeOut(200);
		$('#show_chgName').fadeOut(200);
		$('#show_chgProfPic').fadeIn(600);
	});
	$(document).click(function(event) { 
		if(!$(event.target).closest('.openSet,.openSetg, #show_chgProfPic').length) {
			if($('.openSet,.openSetg, #show_chgProfPic').is(":visible")) {
				$('#show_chgProfPic').hide()
			}
		}        
	})//END
	
	
});

$('.scrollBar').perfectScrollbar({
  wheelSpeed: 10,
  wheelPropagation: false
});

	
});