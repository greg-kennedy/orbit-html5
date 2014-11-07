function menu_draw()
{
	if (state != 0)
	{
		menu_context.drawImage(ASSET_MANAGER.getAsset('img/logo.png'), 0, 0);

		var grd = context.createLinearGradient(0, 128,menu.width,menu.height-128);
		// light blue
		grd.addColorStop(0, '#000');
		// dark blue
		grd.addColorStop(1, '#777');
		menu_context.fillStyle = grd;
		menu_context.fillRect(0, 128, menu.width, menu.height-128);
	}
};

function menu_init()
{
	// Rest of menu may as well just be a gradient or something.
	// add linear gradient

	// Capture mouse / key events
	menu.onmouseclick=function(event) {
	  // take some action based on event.clientX / event.clientY and event.button
	  alert('menu click');
	};

	menu_draw();
}
