

<span id="culture" style="display:none"><?php echo $sf_user->getCulture() ?></span>
<script src="/plugins/arPotsdamPlugin/vendor/EasyAutocomplete-1.3.5/jquery.easy-autocomplete.min.js"></script>
<link rel="stylesheet" href="/plugins/arPotsdamPlugin/vendor/EasyAutocomplete-1.3.5/easy-autocomplete.min.css">
<link rel="icon" type="image/svg+xml" href="/plugins/arPotsdamPlugin/images/SVG/ic_palaeographie.svg" sizes="any">
<script src="/plugins/arPotsdamPlugin/js/map.js" type="text/javascript"></script>


<script src="/plugins/arPotsdamPlugin/js/i18n.js" type="text/javascript"></script>
<script src="/plugins/arPotsdamPlugin/js/kol_const.js" type="text/javascript"></script>
<script src="/plugins/arPotsdamPlugin/js/potsdam.js" type="text/javascript"></script> 
<?php echo get_component_slot('header') ?>
<?php echo get_component('default', 'updateCheck') ?>
<?php if ($sf_user->isAuthenticated()): ?>



<div id="top-bar">
	<nav>
		<?php echo get_component('menu', 'userMenu') ?>
		<?php echo get_component('menu', 'quickLinksMenu') ?>
		<?php if (sfConfig::get('app_toggleLanguageMenu')): ?>
		<?php echo get_component('menu', 'changeLanguageMenu') ?>
		<?php endif; ?>
		<?php echo get_component('menu', 'mainMenu', array('sf_cache_key' => $sf_user->getCulture().$sf_user->getUserID())) ?>
	</nav>
</div>
<?php endif; ?>
<div id="nav" >
		<div id="logo-and-name" style="order:-4; margin-right:20px">
			<h1>
				<?php echo link_to(image_tag('/plugins/arPotsdamPlugin/images/SVG/av_logo.svg', array('alt' => __('Home'))), '/') ?>
			</h1>
		</div>

		<div id="header-search" class=""  style="order:-3" >
			<div id="search-form-wrapper">
				<form action="/index.php/informationobject/browse" data-autocomplete="/index.php/search/autocomplete">
					<input name="topLod" value="0" type="hidden">
					<div class="input-append">
						<input name="query" value="" placeholder="<?php echo __('Search') ?>" type="text" autocomplete="off">
					</div>
				</form>
			</div>
		</div>
		
		<div class="span1"><?php echo image_tag('/plugins/arPotsdamPlugin/images/SVG/ic_search.svg', array('id'=>'simple-search', 'title' => __('Search')))?></div>
		<div class="span1"><?php echo link_to(image_tag('/plugins/arPotsdamPlugin/images/SVG/ic_advanced_search.svg', array('title' => __('Extended Search'))), '/index.php/informationobject/browse?showAdvanced=1&amp;topLod=0')?></div>
		<div class="span1"><?php echo link_to(image_tag('/plugins/arPotsdamPlugin/images/SVG/ic_map_finder.svg', array('title' => __('Map Finder'))), '/map')?></div>
		<div class="span1"><?php echo link_to(image_tag('/plugins/arPotsdamPlugin/images/SVG/ic_thesaurus.svg', array('title' => __('Thesaurus'))), '/thesaurus')?></div>
		<div class="span1"><?php echo link_to(image_tag('/plugins/arPotsdamPlugin/images/SVG/ic_help.svg', array('title' => __('Help'))), '/help')?></div>	

		<div id="lang-menu" data-toggle="tooltip" data-title="Language">
			<button class="top-item" data-toggle="dropdown" data-target="#" aria-expanded="false" title="<?php echo __('Language') ?>">
			  .
			
			</button>
			<div class="top-dropdown-container">
				<div class="top-dropdown-arrow">
					<div class="arrow"></div>
				</div>
				<div class="top-dropdown-header">
					<h2><?php echo __('Languages')?>
					</h2>
				</div>
				<div class="top-dropdown-body">
					<ul>
						<li class="leaf link2de">
							<?php echo link_to(format_language('de', 'de'), array('sf_culture' => 'de') + $sf_data->getRaw('sf_request')->getParameterHolder()->getAll()) ?>
						</li>
						<li class="leaf link2en">
							<?php echo link_to(format_language('en', 'en'), array('sf_culture' => 'en') + $sf_data->getRaw('sf_request')->getParameterHolder()->getAll()) ?>
							</li>
						<li class="leaf link2fr">
							<?php echo link_to(format_language('fr', 'fr'), array('sf_culture' => 'fr') + $sf_data->getRaw('sf_request')->getParameterHolder()->getAll()) ?>
						</li>
					</ul>
				</div>				
			</div>
			
			
		</div>



		<div id="clipboard-menu" data-toggle="tooltip" data-title="Zwischenablage"  data-alert-message="Note: clipboard items unclipped in this page will be removed from the clipboard when the page is refreshed. You can re-select them now, or reload the page to remove them completely. Using the sort or print preview buttons will also cause a page reload - so anything currently deselected will be lost!">
			<button class="top-item" data-toggle="dropdown" data-target="#" aria-expanded="false" title="<?php echo __('Clipboard') ?>">Zwischenablage 
			</button>
			<div class="top-dropdown-container">
				<div class="top-dropdown-arrow">
					<div class="arrow"></div>
				</div>
				<div class="top-dropdown-header">
					<h2><?php echo __("Clipboard") ?>
					</h2>
					<span id="count-block" data-information-object-label="Dokumente" data-actor-object-label="Personen und Organisationen" data-repository-object-label="Archiv">
					</span>
				</div>
				<div class="top-dropdown-body">
					<ul>
						<li class="leaf" id="node_clearClipboard">
							<a href="/index.php/user/clipboardClear" title="Alle Einschränkungen löschen">Alle Einschränkungen löschen</a>
						</li>
						<li class="leaf" id="node_goToClipboard">
							<a href="/index.php/user/clipboard" title="Zur Zwischenablage gehen">Zur Zwischenablage gehen</a>
						</li>
					</ul>
				</div>
				<div class="top-dropdown-bottom">
				</div>
			</div>
		</div>


		<div id="burger-menu" data-toggle="tooltip" data-title="Menu" >
			<button class="top-item" data-toggle="dropdown" data-target="#" aria-expanded="false" title="<?php echo __('Menu') ?>">
			</button>
			<div class="top-dropdown-container">
				<div class="top-dropdown-arrow">
					<div class="arrow"></div>
				</div>
				<div class="top-dropdown-header">
					<h2><?php echo __("Browse") ?>
					</h2>
				</div>
				<div class="top-dropdown-body">
					<ul>
						<li class="leaf" >
							<?php echo link_to(__('Archival descriptions'), '/informationobject/browse') ?>
						</li>
						<li class="leaf" >
						     <?php  echo link_to(__('Archival institutions'), '/repository/browse') ?>
						</li>
						<li class="leaf">
							<?php echo link_to(__('Authority records'), '/actor/browse') ?>
						</li>	
						<li class="leaf">
							<?php echo  link_to(__('Subjects'), '/taxonomy/browse/id/35') ?>
						</li>	
						<li class="leaf" >						
							<?php echo  link_to(__('Places'), '/taxonomy/browse/id/42') ?>
						</li>
						<li class="leaf" >	
							<?php echo  link_to(__('Genre'), '/taxonomy/browse/id/78') ?>
						</li>
					</ul>
				</div>
				
				<div class="top-dropdown-header">
					<h2><?php echo __('Service')?>
					</h2>
				</div>		
				<div class="top-dropdown-body">
					<ul>		
						<li class="leaf">
							<?php echo link_to(__('Old German typewriter'), array('module' => 'staticpage', 'slug' => 'font-tool')) ?>
						</li>
						<li class="leaf">
							<?php echo link_to(__('About the project'), array('module' => 'staticpage', 'slug' => 'about')) ?>
						</li>						 
						<li class="leaf">
							<?php echo link_to(__('Impressum'), array('module' => 'staticpage', 'slug' => 'impressum')) ?>
						</li>
						<li class="leaf">
							<?php echo link_to(__('Data Privacy Statement'), array('module' => 'staticpage', 'slug' => 'data-privacy-statement')) ?>
						</li>
					</ul>
				</div>					
				<div class="top-dropdown-bottom">
				</div>
			</div>
			
			
		</div>




</div>
