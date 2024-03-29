<?php if ($descriptions->getTotalHits() > 0): ?>
  <section>
    <?php echo image_tag('/plugins/arPotsdamPlugin/images/SVG/ic_documents.svg', array('width' => '24', 'height' => '24', 'alt' => sfConfig::get('app_ui_label_informationobject'))) ?>
    <ul>
      <?php foreach ($descriptions->getResults() as $hit): ?>
        <?php $doc = $hit->getData() ?>
        <li>
          <?php echo link_to(get_search_i18n($hit, 'title', array('flat' => true)), array('module' => 'informationobject', 'slug' => $doc->get('slug')->get(0))) ?>
          <?php $lodId = $doc->get('levelOfDescriptionId') ?>
          <?php if (null !== $lodId): ?>
            <?php echo $levelsOfDescription->get($lodId->get(0)) ?>
          <?php endif; ?>
        </li>
      <?php endforeach; ?>
      <?php if ($descriptions->getTotalHits() > 3): ?>
        <li class="showall"><?php echo link_to(__('all matching descriptions'), array('module' => 'informationobject', 'action' => 'browse', 'topLod' => '0') + $allMatchingIoParams->getRawValue()) ?></li>
      <?php endif; ?>
    </ul>
  </section>
<?php endif; ?>

<?php if ($repositories->getTotalHits() > 0): ?>
  <section>
    <?php echo image_tag('/plugins/arPotsdamPlugin/images/SVG/ic_institiutions.svg', array('width' => '24', 'height' => '24', 'alt' => sfConfig::get('app_ui_label_actor'))) ?>
    <ul>
      <?php foreach ($repositories->getResults() as $hit): ?>
        <?php $doc = $hit->getData() ?>
        <li><?php echo link_to(get_search_i18n($hit, 'authorizedFormOfName', array('flat' => true)), array('module' => 'repository', 'slug' => $doc->get('slug')->get(0))) ?></li>
      <?php endforeach; ?>
      <?php if ($repositories->getTotalHits() > 3): ?>
        <li class="showall"><?php echo link_to(__('all matching institutions'), array('module' => 'repository', 'action' => 'browse') + $allMatchingParams->getRawValue()) ?></li>
      <?php endif; ?>
    </ul>
  </section>
<?php endif; ?>

<?php if ($actors->getTotalHits() > 0): ?>
  <section>
    <?php echo image_tag('/plugins/arPotsdamPlugin/images/SVG/ic_authorities.svg', array('width' => '24', 'height' => '24', 'alt' => sfConfig::get('app_ui_label_repository'))) ?>
    <ul>
      <?php foreach ($actors->getResults() as $hit): ?>
        <?php $doc = $hit->getData() ?>
        <li><?php echo link_to(get_search_i18n($hit, 'authorizedFormOfName', array('flat' => true)), array('module' => 'actor', 'slug' => $doc->get('slug')->get(0))) ?></li>
      <?php endforeach; ?>
      <?php if ($actors->getTotalHits() > 3): ?>
        <li class="showall"><?php echo link_to(__('all matching people & organizations'), array('module' => 'actor', 'action' => 'browse') + $allMatchingParams->getRawValue()) ?></li>
      <?php endif; ?>
    </ul>
  </section>
<?php endif; ?>

<?php if ($places->getTotalHits() > 0): ?>
  <section>
    <?php echo image_tag('/plugins/arPotsdamPlugin/images/SVG/ic_places.svg', array('width' => '24', 'height' => '24', 'alt' => sfConfig::get('app_ui_label_place'))) ?>
    <ul>
      <?php foreach ($places->getResults() as $hit): ?>
        <?php $doc = $hit->getData() ?>
        <li><?php echo link_to(get_search_i18n($hit, 'name', array('flat' => true)), array('module' => 'term', 'slug' => $doc->get('slug')->get(0))) ?></li>
      <?php endforeach; ?>
      <?php if ($places->getTotalHits() > 3): ?>
        <li class="showall"><?php echo link_to(__('all matching places'), array('module' => 'taxonomy', 'action' => 'index', 'slug' => 'places', 'subqueryField' => 'allLabels') + $allMatchingParams->getRawValue()) ?></li>
      <?php endif; ?>
    </ul>
  </section>
<?php endif; ?>

<?php if ($subjects->getTotalHits() > 0): ?>
  <section>
    <?php echo image_tag('/plugins/arPotsdamPlugin/images/SVG/ic_subjects.svg', array('width' => '24', 'height' => '24', 'alt' => sfConfig::get('app_ui_label_subject'))) ?>
    <ul>
      <?php foreach ($subjects->getResults() as $hit): ?>
        <?php $doc = $hit->getData() ?>
        <li><?php echo link_to(get_search_i18n($hit, 'name', array('flat' => true)), array('module' => 'term', 'slug' => $doc->get('slug')->get(0))) ?></li>
      <?php endforeach; ?>
      <?php if ($subjects->getTotalHits() > 3): ?>
        <li class="showall"><?php echo link_to(__('all matching subjects'), array('module' => 'taxonomy', 'action' => 'index', 'slug' => 'subjects', 'subqueryField' => 'allLabels') + $allMatchingParams->getRawValue()) ?></li>
      <?php endif; ?>
    </ul>
  </section>
<?php endif; ?>


