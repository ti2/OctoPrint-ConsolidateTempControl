$(function() {
    function ConsolidateTempControlViewModel(parameters) {
        var self = this;

        self.controlViewModel = parameters[0];
        self.temperatureViewModel = parameters[1];
		
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

    }

    OCTOPRINT_VIEWMODELS.push({
        construct: ConsolidateTempControlViewModel,
        dependencies: ["controlViewModel", "temperatureViewModel"]
    });
});
