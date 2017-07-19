'use strict';

function progressBar(element){
	var $self = this;
	$self.elem = element;
	$self.limit= Number(document.getElementsByClassName('pBarRoller')[0].getAttribute('data-limit'));
	$self.maxPercent=100;
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
			var $buttonValue= _elemInst.value;
			var $updateBar = document.getElementById(_elemInst.getAttribute('data-ref'));
			var $counterValue= Number($updateBar.getAttribute('data-counter')) + Number($buttonValue); 
			if($counterValue>200){
				$updateBar.setAttribute('data-counter',$counterValue);
			}else if ($counterValue<0){
				$updateBar.setAttribute('data-counter',0);
			}else{
				$updateBar.setAttribute('data-counter',$counterValue);
			}
			$self._calculateProgress($updateBar,$updateBar.getAttribute('data-counter'));
		});
	});

	document.getElementById('poc-dropdown').addEventListener('change',function(){
		var $selectValue=this.value;
		[].forEach.call(document.querySelectorAll('button'), function(_elemInst) {
			_elemInst.setAttribute('data-ref',$selectValue);
		});
	});

};

progressBar.prototype._calculateProgress=function(_elemInst,_incCount){
	var $self=this;
	var increasedConunt  =  Number(_incCount);
	var _division = Number((increasedConunt/$self.limit)*100).toFixed(2);
	_elemInst.firstElementChild.style.width= _division+'%';
	
	if( Number(_division) > $self.maxPercent){
		_elemInst.firstElementChild.classList.add('red');
		_elemInst.firstElementChild.classList.remove("blue");
		_elemInst.lastElementChild.innerHTML= '100%';
		_elemInst.setAttribute('data-counter',200);
	}else if(Number(_division) < 0){
		_elemInst.lastElementChild.innerHTML= '0%'
		_elemInst.firstElementChild.style.width= '0%';
	}else{
		_elemInst.lastElementChild.innerHTML= _division+'%';
		_elemInst.firstElementChild.classList.remove("red");
		_elemInst.firstElementChild.classList.add('blue');
	}
};
