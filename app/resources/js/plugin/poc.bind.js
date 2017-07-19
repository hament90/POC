'use strict';

function progressBar(element){
	var $self = this;
	$self.elem = element;
	$self.limit= Number(document.getElementsByClassName('pBarRoller')[0].getAttribute('data-limit'));
	//console.log($self.elem,$self.limit);
	$self._init();
};

progressBar.prototype._init = function() {
	var $self= this;
	$self._bindEvents();
};

progressBar.prototype._bindEvents = function() {
	var $self= this;

	[].forEach.call(document.querySelectorAll('button'), function(_elemInst) {
		_elemInst.addEventListener('click', function(i) {
			var buttonValue= _elemInst.value;
			var $updateBar = document.getElementById(_elemInst.getAttribute('data-ref'));
			$updateBar.setAttribute('data-counter',Number($updateBar.getAttribute('data-counter')) + Number(buttonValue));
			$self._calculateProgress($updateBar);
		});
	});

};

progressBar.prototype._calculateProgress=function(_elemInst){
	var $self=this;
	var increasedConunt  =  Number(_elemInst.getAttribute('data-counter'));
	var _division = $self.limit/increasedConunt
	if( _division > 1){
		alert(0)
	}else{

	}
};
