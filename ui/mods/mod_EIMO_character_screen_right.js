var createDiv = CharacterScreenRightPanelHeaderModule.prototype.createDIV;
CharacterScreenRightPanelHeaderModule.prototype.createDIV = function (_parentDiv)
{

	createDiv.call(this, _parentDiv);
	var self = this;

	this.mEIMO =
	{
		Buttons:
		{
			RatioRepairButton: null,
			RatioSalvageButton: null,
			RepairBrotherButton:
			{
				Enabled: false
			},
			RepairCompanyButton:
			{
				Enabled: false
			}
		},
		CurrentBrother: null,
		Legends: false,
		CanRepair: false
	};

	this.mEIMO.Buttons = $('<div class="EIMO-character-screen-buttons"/>')
	this.mContainer.append(this.mEIMO.Buttons);
	this.mEIMO.Buttons.append($('<div class="background"/>'));

	var content = $('<div class="column"/>');
	this.mEIMO.Buttons.append(content);

	var button = $('<div class="l-button repair"/>');
	content.append(button);
	this.mEIMO.Buttons.RatioRepairButton = button.createImageButton(Path.GFX + EIMO.BUTTON_REPAIR, function ()
	{
		self.mDataSource.EIMOratioRepairButtonClicked();
	}, '', 3);

	var button = $('<div class="l-button salvage"/>');
	content.append(button);
	this.mEIMO.Buttons.RatioSalvageButton = button.createImageButton(Path.GFX + EIMO.BUTTON_SALVAGE, function ()
	{
		self.mDataSource.EIMOratioSalvageButtonClicked();
	}, '', 3);
	if (!this.mEIMO.Legends) button.addClass('opacity-none no-pointer-events');

	button = $('<div class="l-button repair-brother"/>');
	content.append(button);
	this.mEIMO.Buttons.RepairBrotherButton = button.createImageButton(Path.GFX + EIMO.BUTTON_REPAIR_ONE_DISABLED, function ()
	{
		if (self.mEIMO.Buttons.RepairBrotherButton.Enabled) self.mDataSource.EIMOpaidRepairBrother();
	}, '', 3);
	this.mEIMO.Buttons.RepairBrotherButton.Enabled = false;

	button = $('<div class="l-button repair-company"/>');
	content.append(button);
	this.mEIMO.Buttons.RepairCompanyButton = button.createImageButton(Path.GFX + EIMO.BUTTON_REPAIR_ALL_DISABLED, function ()
	{
		if (self.mEIMO.Buttons.RepairCompanyButton.Enabled) self.mDataSource.EIMOpaidRepairCompany();
	}, '', 3);
	this.mEIMO.Buttons.RepairCompanyButton.Enabled = false;

	if (this.mDataSource.isTacticalMode())
	{
		this.EIMOhide();
		this.mEIMO.SettingsButton.removeClass('opacity-full is-top').addClass('opacity-none no-pointer-events');
	}
	else
	{
		this.EIMOregisterDatasourceListener();
	}

	var destroyDiv = CharacterScreenRightPanelHeaderModule.prototype.destroyDIV;
	CharacterScreenRightPanelHeaderModule.prototype.destroyDIV = function()
	{
		this.mEIMO.Buttons.RatioRepairButton.remove();
		this.mEIMO.Buttons.RatioRepairButton = null;

		this.mEIMO.Buttons.RatioSalvageButton.remove();
		this.mEIMO.Buttons.RatioSalvageButton = null;

		this.mEIMO.Buttons.RepairBrotherButton.remove();
		this.mEIMO.Buttons.RepairBrotherButton = null;

		this.mEIMO.Buttons.RepairCompanyButton.remove();
		this.mEIMO.Buttons.RepairCompanyButton = null;

		this.mEIMO.Buttons.empty();
		this.mEIMO.Buttons.remove();
		this.mEIMO.Buttons = null;
		destroyDiv.call(this);
	}

	CharacterScreenRightPanelHeaderModule.prototype.EIMOregisterDatasourceListener = function()
	{
		this.mDataSource.addListener(CharacterScreenDatasourceIdentifier.Brother.ListLoaded, jQuery.proxy(this.EIMOgetSettings, this));
		this.mDataSource.addListener(CharacterScreenDatasourceIdentifier.Brother.Selected, jQuery.proxy(this.EIMOonSelectBrother, this));
		this.mDataSource.addListener(CharacterScreenDatasourceIdentifier.Inventory.StashItemUpdated.Key, jQuery.proxy(this.EIMOupdateRepairButtons, this));
	}

	var csBindTooltips = CharacterScreenRightPanelHeaderModule.prototype.bindTooltips;
	CharacterScreenRightPanelHeaderModule.prototype.bindTooltips = function ()
	{
		csBindTooltips.call(this)

		this.mEIMO.Buttons.RatioRepairButton.bindTooltip({ contentType: 'ui-element', elementId:  'EIMO.RepairButton' });
		this.mEIMO.Buttons.RatioSalvageButton.bindTooltip({ contentType: 'ui-element', elementId: 'EIMO.SalvageButton' });
		this.mEIMO.Buttons.RepairBrotherButton.bindTooltip({ contentType: 'ui-element', elementId:  'EIMO.RepairBrotherButton' });
		this.mEIMO.Buttons.RepairCompanyButton.bindTooltip({ contentType: 'ui-element', elementId:  'EIMO.RepairCompanyButton' });
	}

	var csUnbindTooltips = CharacterScreenRightPanelHeaderModule.prototype.unbindTooltips;
	CharacterScreenRightPanelHeaderModule.prototype.unbindTooltips = function ()
	{
		csUnbindTooltips.call(this);

		this.mEIMO.Buttons.RatioRepairButton.unbindTooltip();
		this.mEIMO.Buttons.RatioSalvageButton.unbindTooltip();
		this.mEIMO.Buttons.RepairBrotherButton.unbindTooltip();
		this.mEIMO.Buttons.RepairCompanyButton.unbindTooltip();
	}

	CharacterScreenRightPanelHeaderModule.prototype.EIMOhide = function()
	{
		this.mEIMO.Buttons.removeClass('opacity-full is-top').addClass('opacity-none no-pointer-events');
	}

	CharacterScreenRightPanelHeaderModule.prototype.EIMOshow = function()
	{
		this.mEIMO.Buttons.removeClass('opacity-none no-pointer-events').addClass('opacity-full is-top');
	}

	CharacterScreenRightPanelHeaderModule.prototype.EIMOonSelectBrother = function(_datasource, _brother)
	{
		this.mDataSource.EIMOsetSelectedBrother(_brother[CharacterScreenIdentifier.Entity.Id]);
		this.EIMOupdateRepairButtons();
	}

	CharacterScreenRightPanelHeaderModule.prototype.EIMOupdateRepairButtons = function()
	{
		var self = this;
		this.mDataSource.EIMOgetRepairButtonData(function(data)
		{
			self.EIMOrepairBrotherButtonState(data.canRepairBrother);
			self.EIMOrepairCompanyButtonState(data.canRepairCompany);
		});
	}

	CharacterScreenRightPanelHeaderModule.prototype.EIMOrepairBrotherButtonState = function (_enable)
	{
		if (!this.mEIMO.CanRepair) _enable = false;
		if (this.mEIMO.OptionsMenu.RepairBrother.Enabled === _enable) return;
		this.mEIMO.OptionsMenu.RepairBrother.Enabled = _enable;
		if (_enable === true)
			this.mEIMO.OptionsMenu.RepairBrother.changeButtonImage(Path.GFX + EIMO.BUTTON_REPAIR_ONE_ENABLED);
		else
			this.mEIMO.OptionsMenu.RepairBrother.changeButtonImage(Path.GFX + EIMO.BUTTON_REPAIR_ONE_DISABLED);
	};

	CharacterScreenRightPanelHeaderModule.prototype.EIMOrepairCompanyButtonState = function (_enable)
	{
		if (!this.mEIMO.CanRepair) _enable = false;
		if (this.mEIMO.OptionsMenu.RepairCompany.Enabled === _enable) return;
		this.mEIMO.OptionsMenu.RepairCompany.Enabled = _enable;
		if (_enable === true)
			this.mEIMO.OptionsMenu.RepairCompany.changeButtonImage(Path.GFX + EIMO.BUTTON_REPAIR_ALL_ENABLED);
		else
			this.mEIMO.OptionsMenu.RepairCompany.changeButtonImage(Path.GFX + EIMO.BUTTON_REPAIR_ALL_DISABLED);
	};

	CharacterScreenRightPanelHeaderModule.prototype.EIMOgetSettings = function()
	{
		var self = this;
		this.mDataSource.EIMOnotifyBackendGetSettings(function(res)
		{
			if (res.isVisible) self.EIMOshow();
			else self.EIMOhide();
			self.mEIMO.Legends = res.legends;
			self.mEIMO.CanRepair = res.canRepair;
		});
	}
}
