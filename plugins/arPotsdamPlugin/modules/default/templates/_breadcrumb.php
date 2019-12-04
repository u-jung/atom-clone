<section class="breadcrumb">
<?php $i=0 ?>
  <ul>
    <?php foreach ($objects as $object): ?>
      <?php if (isset($object->parent)): // FIXME Implement something like ->slice(1) or [1:] ?>
        <?php if (isset($resource) && $object == $resource): ?>
          <li style="margin-left:<?php echo ($i*20) ?>px" class="active"><span><?php echo render_title($object) ?></span></li>
        <?php else: ?>
          <li style="margin-left:<?php echo ($i*20) ?>px" <?php if ($i==1) { echo ' class="institution" ';  } ?> ><?php echo link_to(render_title($object), array($object, 'module' => 'informationobject')) ?></li>
        <?php endif; ?>
      <?php endif; ?>
		<?php $i+=1 ?>
    <?php endforeach; ?>
  </ul>

</section>
