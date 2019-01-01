$(function() {
	function ConsolidateTempControlViewModel(parameters) {
		var self = this;

		self.controlViewModel = parameters[0];
		self.temperatureViewModel = parameters[1];
		self.touchui = parameters[2];

		// don't load when touchui is active and hide tab.
		if (self.touchui && self.touchui.isActive()) {
			console.log('Consolidate Temp Control: hiding tab and bypassing adjustments because of touchui.');
			$('#tab_plugin_consolidate_temp_control_link').hide();
			return;
		}

		console.log('Consolidate Temp Control: Hiding temp and control tab, applying width adjustments, and setting callbacks.');

		// hide orginal temp and control tab
		$('#control_link,#temp_link').hide();

		// page container adjustments
		$('div.page-container').css({'min-width':'1900px'});

		// navbar adjustments
		$('#navbar > div.navbar-inner > div.container').css({'width':'100%'});
		$('#navbar > div.navbar-inner > div.row-fluid > div.nav-collapse').css({'padding-right':'20px'});

		// main content adjustments
		$('div.container.octoprint-container').addClass('row-fluid');
		$('div.container.octoprint-container.row-fluid > div.row').css({'margin-left':'20px','padding-right':'20px'});

		// sidebar adjustments
		$('div.container.octoprint-container > div.row > div.accordion.span4').removeClass('span4').addClass('span2');
		$('#files div.row-fluid.upload-buttons > span.btn.btn-primary.fileinput-button.span6:nth-child(2) > span').text('Upload SD');

		// tabs adjustments
		$('div.container.octoprint-container > div.row > div.tabbable.span8').removeClass('span8').addClass('span10');
		$('div#tabs_content div.tab-pane:not("#tab_plugin_consolidate_temp_control")').wrapInner('<div class="span6"></div>');
		$('div#tabs_content div.tab-pane:not("#tab_plugin_consolidate_temp_control") div.span6').wrap('<div class="row-fluid"></div>');

		// footer adjustments
		$('div.container.octoprint-container > div.footer').css({'padding-left':'20px','padding-right':'20px'});

		// fix control tab
		self.onTabChange = function(current, previous) {
			console.log('Consolidate Temp Control: onTabChange called.');
			if ((current === "#tab_plugin_consolidate_temp_control") || (current === "#temp") || (current === "#control")) {
				var selected = OctoPrint.coreui.selectedTab;
				OctoPrint.coreui.selectedTab = "#control";
				self.controlViewModel.onTabChange("#control", previous);
				OctoPrint.coreui.selectedTab = selected;
			} else if (previous === "#tab_plugin_consolidate_temp_control") {
				self.controlViewModel.onTabChange(current, "#control");
			}
		};

		self.onAllBound = function(allViewModels) {
			console.log('Consolidate Temp Control: onAllBound called.');
			var selected = OctoPrint.coreui.selectedTab;
			OctoPrint.coreui.selectedTab = "#control";
			self.controlViewModel.onAllBound(allViewModels);
			OctoPrint.coreui.selectedTab = selected;
			self.temperatureViewModel._initializePlot();
		};

		self.controlViewModel.onBrowserTabVisibilityChange = function(status) {
			console.log('Consolidate Temp Control: onBrowserTabVisibilityChange called.');
			if (status) {
				var selected = OctoPrint.coreui.selectedTab;
				OctoPrint.coreui.selectedTab = "#control";
				self.controlViewModel._enableWebcam();
				OctoPrint.coreui.selectedTab = selected;
			} else {
				self.controlViewModel._disableWebcam();
			}
		};

		// fix temperature tab
		self.onAfterTabChange = function(current, previous) {
			console.log('Consolidate Temp Control: onAfterTabChange called.');
			if ((current === "#tab_plugin_consolidate_temp_control") || (current === "#temp") || (current === "#control")) {
				if (!self.temperatureViewModel.plot) {
					self.temperatureViewModel._initializePlot();
				} else {
					self.temperatureViewModel.updatePlot();
				}
				self.temperatureViewModel.onAfterTabChange("#temp", previous);
			} 
		}
	}

	OCTOPRINT_VIEWMODELS.push({
		construct: ConsolidateTempControlViewModel,
		dependencies: ["controlViewModel", "temperatureViewModel", "touchUIViewModel"],
		optional: ["touchUIViewModel"]
	});
});