    <?php if ('de' == $sf_user->getCulture()): ?>
      <h1>Archivführer zur deutschen Kolonialgeschichte</h1>
      <div>Wissen, wo sich Dokumente befinden</div>
	  <p>Deutschlands koloniale Vergangenheit hat vielfältige Spuren in den Archiven hinterlassen. Ziel dieses Projekts ist es, diese Spuren zusammenzufassen und mit Informationen zu den Orten, Akteuren, Objekten  und Ereignissen zu verknüpfen. </p>

    <?php elseif ('fr' == $sf_user->getCulture()): ?>
	   <h1>Guide des archives sur l'histoire coloniale allemande</h1>
       <div>Savoir où se trouvent les documents</div>
       <p>Le passé colonial allemand a laissé des nombreuses traces dans les archives. C'est le but ce projet de rassambler ces traces et de les lier avec les informations sur les lieux, les acteurs, les objets et les événements.</p>

    <?php else: ?>
      <h1>Archive guide to the German Colonial Past</h1>
      <div>To know where documents are located</div>
      <p>German colonial past left numerous marks in archives. It is the aim of this project to bring this traces together as well as to link them with information on places, actors, objects and events.</p>
    <?php endif; ?>
