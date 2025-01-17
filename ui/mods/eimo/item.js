var createListItem = $.fn.createListItem;
$.fn.createListItem = function(_withPriceLayer, _backgroundImage, _classes)
{
	var result = createListItem.call(this, _withPriceLayer, _backgroundImage, _classes);

	// Repair profit layer
	var repairProfitLayer = $('<div class="repair-profit-layer display-none"/>');
	result.append(repairProfitLayer);
	var repairProfitImage = $('<img/>');
	repairProfitImage.attr('src', Path.GFX + Asset.ICON_ASSET_MONEY);
	repairProfitLayer.append(repairProfitImage);
	var repairProfitLabel = $('<div class="label text-font-very-small font-color-value font-shadow-outline"/>');
	repairProfitLayer.append(repairProfitLabel);

	// For sale layer
	var forSaleLayer = $('<div class="for-sale-layer display-none"/>');
	result.append(forSaleLayer);
	var forSaleImage = $('<img/>');
	forSaleImage.attr('src', Path.GFX + EIMO.ICON_MONEY);
	forSaleLayer.append(forSaleImage);

	// Favorite layer
	var favoriteLayer = $('<div class="favorite-layer display-none"/>');
	result.append(favoriteLayer);
	var favoriteImage = $('<img/>');
	favoriteImage.attr('src', Path.GFX + EIMO.ICON_FAVORITE);
	favoriteLayer.append(favoriteImage);

	return result;
};

$.fn.setForSaleImageVisible = function(_isVisible)
{
	var imageLayer = this.find('.for-sale-layer:first');
	if (_isVisible)
	{
		imageLayer.removeClass('display-none').addClass('display-block');
	}
	else
	{
		imageLayer.addClass('display-none').removeClass('display-block');
	}
};

$.fn.setFavoriteImageVisible = function(_isVisible)
{
	var imageLayer = this.find('.favorite-layer:first');
	if (imageLayer.find('>img').filter(':first').attr('src') != Path.GFX + EIMO.ICON_FAVORITE) return;
	if (_isVisible)
	{
		imageLayer.removeClass('display-none').addClass('display-block');
	}
	else
	{
		imageLayer.addClass('display-none').removeClass('display-block');
	}
};

$.fn.setFavoriteIDImageVisible = function(_isVisible)
{
	var imageLayer = this.find('>.favorite-layer').filter(':first');
	if (_isVisible)
	{
		imageLayer.find('>img').filter(':first').attr('src', Path.GFX + EIMO.ICON_FAVORITE_ID)
		imageLayer.removeClass('display-none').addClass('display-block');
	}
	else
	{
		imageLayer.find('>img').filter(':first').attr('src', Path.GFX + EIMO.ICON_FAVORITE)
		if (!($(this).data('item').eimo_favorite))
			imageLayer.addClass('display-none').removeClass('display-block');
	}
};

$.fn.setRepairProfitVisible = function(_value, _color)
{
	if (_color === undefined) {_color = '#ffffff'}
	var layer = this.find('.repair-profit-layer:first');
	var label = layer.find('.label:first');
	if (_value !== undefined && _value !== null)
	{
		label.text(_value);
		layer.removeClass('display-none').addClass('display-block');
	}
	else
	{
		layer.removeClass('display-block').addClass('display-none');
	}
	label.css({'color' : _color});
};
