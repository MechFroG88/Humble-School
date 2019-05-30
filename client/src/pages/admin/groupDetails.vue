<template>
  <div id="_groupDetails">
    <div class="column col-9">
      <div class="title">学会详情</div>
      <div class="groupName">
        <label class="form-label" >学会名称</label>
        <div class="name">华文学会</div>
      </div>
      <div class="classGroup">
        <div class="form-group">
          <label class="form-label" for="classNameC">地点（华）</label>
          <input class="form-input" type="text" id="classNameC" placeholder="请输入活动地点">
        </div>
        <div class="form-group">
          <label class="form-label" for="classNameE">地点（英）</label>
          <input class="form-input" type="text" id="classNameE" placeholder="请输入活动地点">
        </div>
      </div>
      <div class="form-group theme">
        <label class="form-label" for="theme">主题</label>
        <input class="form-input" type="text" id="theme" placeholder="请输入活动主题">
      </div>
      <div class="form-group details">
        <label class="form-label" for="details">活动详情</label>
        <textarea class="form-input" id="details" placeholder="请输入活动详情" rows="5"></textarea>
      </div>
      <div class="pic">
        <label>封面照片</label>
         <div class="btn btn-primary ">上传照片</div>
      </div>
    </div>
  </div>
  
</template>

<script>


export default {
  data: () => ({
    
  })

}
</script>

<style>

</style>
