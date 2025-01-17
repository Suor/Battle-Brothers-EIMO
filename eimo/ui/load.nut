local function registerJS( _file )
{
	::mods_registerJS("eimo/" + _file);
}

local function registerCSS( _file )
{
	::mods_registerCSS("eimo/css/" + _file);
}

local function includeFile( _file )
{
	::includeFile("eimo/ui/", _file);
}

includeFile("tooltips");

registerJS("assets.js");
registerJS("character_screen_datasource.js");
registerJS("character_screen.js");
registerJS("character_screen_inventory_list_module.js");
registerJS("character_screen_right_panel_header_module.js");
registerJS("item.js");
registerJS("tactical_combat_result_screen_loot_panel.js");
registerJS("world_town_screen_shop_dialog_module.js");

registerCSS("character_screen.css");
registerCSS("item.css");
registerCSS("tactical_combat_result_screen_loot_panel.css");
registerCSS("world_town_screen_shop_dialog_module.css")
