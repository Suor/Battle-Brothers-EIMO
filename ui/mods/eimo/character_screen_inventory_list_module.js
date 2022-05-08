var charRemoveItemFromSlot = CharacterScreenInventoryListModule.prototype.removeItemFromSlot;
CharacterScreenInventoryListModule.prototype.removeItemFromSlot = function(_slot)
{
	_slot.setForSaleImageVisible(false);
	_slot.setFavoriteImageVisible(false);
	_slot.setRepairProfitVisible(null);
	charRemoveItemFromSlot.call(this, _slot);
}

var csAssignItemToSlot = CharacterScreenInventoryListModule.prototype.assignItemToSlot;
CharacterScreenInventoryListModule.prototype.assignItemToSlot = function(_entityId, _owner, _slot, _item)
{
	csAssignItemToSlot.call(this, _entityId, _owner, _slot, _item);
	if ((CharacterScreenIdentifier.Item.Id in _item) && (CharacterScreenIdentifier.Item.ImagePath in _item))
	{
		var itemData = _slot.data('item');
		itemData.eimo_forSale = _item.eimo_forSale;
		itemData.eimo_favorite = _item.eimo_favorite;
		itemData.eimo_repairProfit = Math.round(_item.eimo_repairProfit === undefined ? 0 : _item.eimo_repairProfit);
		switch (MSU.getSettingValue(EIMO.ID, EIMO.VisibilityLevelID))
		{
			case "Reduced":
				_slot.setForSaleImageVisible(_item.eimo_forSale);
				_slot.setFavoriteImageVisible(_item.eimo_favorite);
				break;
			case "Off":
				break;
			case "Normal": default:
				_slot.setForSaleImageVisible(_item.eimo_forSale);
				_slot.setFavoriteImageVisible(_item.eimo_favorite);
				if (itemData.eimo_repairProfit != 0 && itemData.eimo_repairProfit !== undefined)
				{
					_slot.setRepairProfitVisible(itemData.eimo_repairProfit.toString(), _item[CharacterScreenIdentifier.Item.AmountColor]);
				}
		}
	}
};

var csCreateItemSlots = CharacterScreenInventoryListModule.prototype.createItemSlots;
CharacterScreenInventoryListModule.prototype.createItemSlots = function( _owner, _size, _itemArray, _itemContainer )
{
	var self = this;
	_itemContainer.createListItem = function(_withPriceLayer, _backgroundImage, _classes)
	{
		var result = $.fn.createListItem.call(this, _withPriceLayer, _backgroundImage, _classes);
		result.mousedown(function(_event)
		{
			if (MSU.Keybinds.isMousebindPressed(EIMO.ID, "SetForSale", _event))
			{
				var data = $(this).data('item');
				_event.stopImmediatePropagation();

				self.mDataSource.EIMOsetForSaleInventoryItem(data.itemId, function (_notNull)
				{
					if (_notNull)
					{
						data.eimo_forSale = !data.eimo_forSale;
						result.setForSaleImageVisible(data.eimo_forSale);
					}
				});
				return false;
			}
			if (MSU.Keybinds.isMousebindPressed(EIMO.ID, "SetFavorite", _event))
			{
				var data = $(this).data('item');
				_event.stopImmediatePropagation();

				self.mDataSource.EIMOfavoriteInventoryItem(data.itemId, function (_notNull)
				{
					if (_notNull)
					{
						data.eimo_favorite = !data.eimo_favorite;
						result.setFavoriteImageVisible(data.eimo_favorite);
					}
				});
				return false;
			}
			return;
		});
		return result;
	}
	csCreateItemSlots.call(this, _owner, _size, _itemArray, _itemContainer);
	delete _itemContainer.createListItem;
}
