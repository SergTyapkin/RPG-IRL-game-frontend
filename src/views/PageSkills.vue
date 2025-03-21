<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-page-skills
  padding-bottom 0px

  .section-user-info
    display flex
    align-items flex-end

  .section-resources
    margin-top 20px
    margin-bottom 60px
    display flex
    justify-content space-around
    gap 5px
    flex-wrap wrap

    .button
      button-no-styles()
      border-radius borderRadiusM
      padding 10px
      hover-effect()
      trans()

      &.selected
        background colorBlockBg

  .section-skills-tree
    overflow hidden

    .tree-container
      position relative
      width fit-content
      height calc(100vh - 340px)

      svg
        overflow visible
        user-select none
        .skills
          .cell-container
            overflow visible
            .cell
              cell-size = 100%
              left calc(var(--x) * 5px)
              top calc(var(--y) * 5px)
              width cell-size
              height cell-size
              hover-effect()
              &:hover
                opacity 1
                filter brightness(1.5)

              .item-name
                font-small-extra()
                font-thin()
                position absolute
                bottom 0
                left 0
                width 100%
                padding 2px 0
                text-align center
                background #00000066
                border-radius 0 0 borderRadiusS borderRadiusS
              .cost
                position absolute
                right -5px
                top -5px
                centered-flex-container()
                width 20px
                height 20px
                border-radius borderRadiusMax
                background white
                box-shadow -2px 1px 0 #000
                font-small-extra()
                &.P
                  background colorEmpHP
                &.A
                  background colorEmpAgility
                &.I
                  background colorEmpIntelligence
              .locked
                position absolute
                inset 0
                background #44444488
                backdrop-filter saturate(0)
                border-radius borderRadiusS
                img
                  width 30px
                  height 30px
                  centered-absolute-transform()

        .lines
          .line
            stroke-width 2px
            stroke colorSec1
            trans()
            &.dark
              stroke-width 1px
              opacity .3

  hr
    border none
    height 2px
    background background linear-gradient(90deg, transparent, colorEmp1, transparent)
</style>

<template>
  <div class="root-page-skills">
    <section class="section-user-info">
      <UserProfileInfo />
    </section>

    <section class="section-resources">
      <button
        class="button"
        @click="selectedTree = ResourceTypes.power"
        :class="{ selected: selectedTree === ResourceTypes.power }">
        <ValueBadge :type="ResourceTypes.power" :value="$user.stats?.hp" :not-synced-value="50" small />
      </button>
      <button
        class="button"
        @click="selectedTree = ResourceTypes.agility"
        :class="{ selected: selectedTree === ResourceTypes.agility }">
        <ValueBadge :type="ResourceTypes.agility" :value="$user.stats?.agility" :not-synced-value="50" small />
      </button>
      <button
        class="button"
        @click="selectedTree = ResourceTypes.intelligence"
        :class="{ selected: selectedTree === ResourceTypes.intelligence }">
        <ValueBadge
          :type="ResourceTypes.intelligence"
          :value="$user.stats?.intelligence"
          :not-synced-value="50"
          small />
      </button>
    </section>

    <hr />
    <section class="section-skills-tree">
      <DraggableComponent
        ref="draggableEl"
        :default-scale="1"
        :max-x-offset="100"
        :max-y-offset="100"
        :min-x-offset="100"
        :min-y-offset="100"
        :min-scale="0.5"
        :max-scale="3"
        class="draggable-element">
        <div class="tree-container">
          <svg :viewBox="`0 0 ${svgMaxWidth} ${svgMaxHeight}`" :width="svgMaxWidth" :height="svgMaxHeight">
            <g class="lines">
              <g v-for="skill in iterableSkillTree">
                <line
                  class="line"
                  v-for="line in skill.lines"
                  :class="{dark: !$user.skills.includes(skill.parentId)}"
                  :x1="line[0] + 40"
                  :y1="line[1] + 40"
                  :x2="line[2] + 40"
                  :y2="line[3] + 40"
                />
              </g>
            </g>

            <g class="skills">
              <g v-for="skill in iterableSkillTree">
                <foreignObject class="cell-container" :x="skill.position[0]" :y="skill.position[1]" :width="80" :height="80">
                  <Cell class="cell" :src="AbilityDefaultImage" @click="$user.skills.push(skill.id)">
                    <div class="item-name">{{ skill.name }}</div>
                    <transition name="opacity">
                      <div class="locked" v-if="!$user.skills.includes(skill.id)">
                        <img src="/static/icons/lock.svg" alt="locked">
                      </div>
                    </transition>
                    <transition name="opacity">
                      <div class="cost" :class="selectedTree" v-if="!$user.skills.includes(skill.id) && $user.skills.includes(skill.parentId)">{{ skill.cost }}</div>
                    </transition>
                  </Cell>
                </foreignObject>
              </g>
            </g>
          </svg>
        </div>
      </DraggableComponent>
    </section>
    <hr />
  </div>
</template>

<script lang="ts">
import CircleLoading from '~/components/loaders/CircleLoading.vue';
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import ValueBadge from '~/components/ValueBadge.vue';
import { IterableSkillTrees, ResourceTypes, SkillTrees } from '~/constants';
import DraggableComponent from '~/components/DraggableComponent.vue';
import Cell from '~/components/Cell.vue';
import { deepClone } from '~/utils/utils';

import AbilityDefaultImage from '#/images/knife-example.png';

export default {
  components: { Cell, DraggableComponent, ValueBadge, UserProfileInfo, CircleLoading },

  data() {
    return {
      loading: false,
      selectedTree: ResourceTypes.power,

      ResourceTypes,
      AbilityDefaultImage,
    };
  },

  computed: {
    iterableSkillTree(): (Skill | { lines?: [number, number] })[] {
      console.log(IterableSkillTrees[this.selectedTree]);
      return IterableSkillTrees[this.selectedTree];
    },
    svgMaxWidth() {
      if (!this.iterableSkillTree) {
        return 0;
      }
      return this.iterableSkillTree.reduce((acc, item) => Math.max(acc, item.position[0] + 80), 0);
    },
    svgMaxHeight() {
      if (!this.iterableSkillTree) {
        return 0;
      }
      return this.iterableSkillTree.reduce((acc, item) => Math.max(acc, item.position[1] + 80), 0);
    },
  },

  mounted() {
    console.log(this.$user.skills);
  },

  methods: {},
};
</script>
