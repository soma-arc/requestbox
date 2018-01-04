<template>
<div class="card medium" v-bind:class="{ deadlineWarning: closedToDeadline }">
  <div class="section">
    <span><h3>{{ request.title }}</h3>
      応募期限 {{ request.dateOfDeadline }}</span>
  </div>
  <div class="request-content">
    <!-- <button>編集</button><button>削除</button><br> -->
    <span>
      <b>依頼者:</b> {{ request.authorName }}
      {{ request.authorLab | requestLabFormat }}
    </span><br>
    <span>
      <b>場所: </b>
      {{ request.location }}<br>
    </span>
    <div v-for="(date, index) in request.dateOfExperiment">
        <span><b>日時 {{ index }}:</b> {{ date }}</span><br>
    </div>
    <span>
      <b>所要時間: </b>
      {{ request.time }}
      <br>
    </span>
    <span><b>実験形式:</b> {{ request.format }}</span><br>
    <span><b>募集人数:</b> {{ request.num }}人</span><br>
    <span><b>条件:</b> {{ request.requirements }}</span><br>
    <span><b>報酬:</b> {{ request.rewards }}</span><br>
    <span><b>連絡先:</b> {{ request.rewards }}</span><br>
    <b>詳細</b>
    <p class="section" style="white-space: pre;">{{ request.details }}</p>
  </div>
  <label class="button" v-bind:for="request.id">Edit</label>
  <input v-bind:id="request.id" type="checkbox"/>
  <div class="modal" id="mod">
    <div class="card large modal-card">
        <label v-bind:for="request.id" class="close"></label>
        <div class="section">
            <span><h3>編集</h3>
            </span>
            <label class="button" v-bind:for="request.id">変更を保存</label>
        </div>
      <div id="edit-contents">
          タイトル *<input v-model="request.title" :required="true">
          場所<input v-model="request.location">
          実験日時
          <div v-for="(dateInput, index) in request.dateOfExperiment">
              <span>
                  <flat-pickr v-model="request.dateOfExperiment[index]"
                              :config="flatPickrConfig"/>
                  <button @click="removeDate(index)">削除</button>
              </span>
          </div>
          <label class="button" @click="addDate">日時を追加</label>
          募集期限<flat-pickr v-model="request.dateOfDeadline"
                              :config="flatPickrConfig"/>
          報酬<input v-model="rewards">
          募集人数<input v-model.number="request.num" type="number" min="1">
          所要時間<flat-pickr v-model="request.time" :config="flatPickrTimeConfig"/>
          形態<br>
          <div class="input-group">
              <input type="radio" id="rad3" v-model="request.format"
                     name="format-radio" value="実験" tabindex="0"
                     checked="checked"><label for="rad3">実験</label>
              <input type="radio" id="rad1" v-model="request.format"
                     name="format-radio" value="アンケート" tabindex="0"><label for="rad1">アンケート</label>
              <input type="radio" id="rad2" v-model="request.format"
                     name="format-radio" value="other" tabindex="0"><label for="rad2">その他</label>
          </div>
          <transition name="component-fade" mode="out-in">
              <input v-show="format === 'other'" v-model="formatOther" :required="true">
          </transition>
          募集条件<input v-model="request.requirements">
          連絡先 *<input v-model="request.contact" :required="true">
          詳細 *
          <div style="height: 200px;">
              <textarea v-model="request.details" :required="true"></textarea>
          </div>
          <label class="button" v-bind:for="request.id">変更を保存</label>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component';
export default {
     props: ['request'],
     data: function(){
         return {
             flatPickrConfig: {
                 enableTime: true,
                 time_24hr: true,
                 enable: [
                     function(date) {
                         // return true to enable
                         return (date.getTime() > new Date().getTime());
                     }
                 ]
             },
             flatPickrTimeConfig: {
                 enableTime: true,
                 noCalendar: true,
                 enableSeconds: false,
                 time_24hr: true,
                 dateFormat: 'H時間i分',
             },
         }
     },
     filters: {
         requestLabFormat: function (value) {
             if (value === '') return '';
             return `(${value}研)`;
         }
     },
     computed: {
         closedToDeadline: function() {
             const deadline = new Date(this.request.dateOfDeadline);
             // three days
             return (deadline.getTime() - new Date().getTime()) < 259200000;
         }
     },
     methods: {
         addDate: function(event) {
             this.required.dateList.push(new Date());
         },
     },
     components: {
         FlatPickr,
     },
}
</script>

<style>
.card {
    height: 480px;
    display: flex;
}

.request-content {
    flex: 1;
    vertical-align: top;
    padding: 10px;
}

.button {
    text-align: center;
}

.modal-card {
    padding: 5px;
}

.deadlineWarning {
    background-color: LemonChiffon;
}

#edit-contents {
    display:flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5px;
 }

 textarea {
     resize: none;
     width: 400px;
     height: 200px;
 }
</style>
