<template>
  <div>
    <h2>実験依頼を投稿する</h2>
    <span>依頼者 {{ this.loggedInUser.name }}</span>
    <span>所属研究室 {{ this.lab }}</span>
    タイトル<input v-model="title">
    場所<input v-model="location">
    実験日時
    <div v-for="(dateInput, index) in dateList">
        <span>
            <flat-pickr v-model="dateList[index]"
                        :config="flatPickrConfig"/>
            <button @click="removeDate(index)">削除</button>
        </span>
    </div>
    <button @click="addDate">日時を追加</button>
    募集期限<flat-pickr v-model="deadline"
                        :config="flatPickrConfig"/>
    報酬<input v-model="rewards">
    募集人数<input v-model="num" type="number" min="1">
    所要時間<flat-pickr v-model="time" :config="flatPickrTimeConfig"/>
    形式<br>
    <div class="input-group">
        <input type="radio" id="rad3" v-model="format"
               name="format-radio" value="experiment" tabindex="0"
               checked="checked"><label for="rad3">実験</label>
        <input type="radio" id="rad1" v-model="format"
               name="format-radio" value="questionnaire" tabindex="0"><label for="rad1">アンケート</label>
        <input type="radio" id="rad2" v-model="format"
               name="format-radio" value="other" tabindex="0"><label for="rad2">その他</label>
    </div>
    <transition name="component-fade" mode="out-in">
      <input v-show="format === 'other'" v-model="formatOther">
    </transition>
    募集条件<input v-model="requirements">
    連絡先<input v-model="contact">
    詳細
    <textarea v-model="details"></textarea>
    <button @click="postRequest">送信</button>
    <transition name="component-fade" mode="out-in">
      <error-card :error="errorObj" v-show="errorObj.code"/>
    </transition>
  </div>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component';
import ErrorCard from './error-card.vue';
import Request from '../request.js';

export default {
    props: ['currentRoute', 'requestList', 'loggedInUser'],
    data: function() {
        return {
            title: '',
            location: '',
            date: new Date(),
            deadline: new Date(),
            dateList: [],
            time: new Date(2013, 2, 1, 0, 30),
            requirements: '',
            rewards: '',
            abstract: '',
            contact: '',
            details: '',
            format: 'experiment',
            formatOther: '',
            num: 1,
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
            errorObj: {}
        }
    },
    methods: {
        postRequest: function() {
            if (this.checkInputs() === false) return;
            let formatStr = '';
            if(this.format === 'experiment') {
                formatStr = '実験'
            } else if (this.format === 'questionnaire') {
                formatStr = 'アンケート'
            } else if (this.format === 'other') {
                formatStr = this.formatOther
            }
            Request.AddToDatabase(this.loggedInUser.id, this.loggedInUser.name,
                                  this.loggedInUser.lab, this.title, this.location,
                                  formatStr, this.dateList, this.deadline,
                                  this.time, this.num, this.requirements,
                                  this.rewards, this.abstract, this.contact, this.details);
            this.initFields();
            this.goToBoard();
        },
        initFields: function() {
            this.title = '';
            this.location = '';
            this.format = '';
            this.formatOther = '';
            this.requirements = '';
            this.rewards = '';
            this.abstract = '';
            this.details = '';
            this.num = 1;
            this.errorObj = {};
        },
        checkInputs: function() {
            // TODO: check inputs
            return true;
        },
        goToBoard: function() {
            this.$root.currentRoute = '/';
            window.history.pushState(
                null,
                'board-panel',
                '/'
            );
        },
        addDate: function(event) {
            this.dateList.push(new Date());
        },
        removeDate: function(index) {
            this.dateList.splice(index, 1);
        }
    },
    components: {
        FlatPickr,
        ErrorCard
    },
    computed: {
        lab: function() {
            return (this.loggedInUser.lab === '') ? '未設定' : this.loggedInUser.lab;
        }

    }
}
</script>

<style>
textarea {
    resize: none;
    width: 400px;
    height: 200px;
}
</style>
