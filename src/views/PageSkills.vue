<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-page-skills
  padding-bottom 0px !important

  .section-user-info
    display flex
    align-items flex-end
    animation-float(0.5s, -20px, 0, left)

  .section-resources
    display flex
    flex-wrap wrap
    gap 0px
    justify-content space-around
    margin-top 20px
    margin-bottom 10px

    .button
      button-no-styles()

      padding 10px
      border-radius borderRadiusM
      hover-effect()
      trans()
      &:nth-child(1)
        animation-float(0.5s, -20px, 0, left)
      &:nth-child(2)
        animation-opacity()
      &:nth-child(3)
        animation-float(0.5s, +20px, 0, right)

      &.selected
        background colorBlockBg

  .section-skills-tree
    overflow hidden
    animation-float()

    .tree-container
      position relative
      width fit-content
      height calc(100vh - 340px)

      svg
        user-select none
        overflow visible

        .skills
          .cell-container
            animation-float()

            overflow visible

            .cell
              top calc(var(--y) * 5px)
              left calc(var(--x) * 5px)
              width cell-size
              height cell-size
              cell-size = 100%
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
                top -5px
                right -5px
                width 20px
                height 20px
                background white
                border-radius borderRadiusMax
                box-shadow -2px 1px 0 #000
                centered-flex-container()
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
            stroke colorSec1
            stroke-dasharray 0 100%
            stroke-width 2px
            animation line 0.5s linear forwards
            trans()
            animation-index-delay()

            @keyframes line
              from
                stroke-dasharray 0 100%
              to
                stroke-dasharray 100% 0

            &.dark
              opacity 0.3
              stroke-width 1px

  hr
    height 2px
    background background linear-gradient(90deg, transparent, colorEmp1, transparent)
    border none

  .section-modals
    position fixed
    inset 0
    overflow-y auto
    padding-bottom 100px
    background #00000050
    backdrop-filter blur(10px)

    .modal
      width calc(100% - 30px)
      max-width 400px
      margin 30px auto
      padding 20px
      background colorBgLight
      border-radius borderRadiusM
      box-shadow 0 0 15px #000

      button
        button()

        &.trade
          button-emp()

      .cost
        color colorSec1

        .number
          padding 3px 10px
          color colorBg
          background colorSec1
          border-radius borderRadiusMax
</style>

<template>
  <div class="root-page-skills">
    <section class="section-user-info" style="--animation-index: 0">
      <UserProfileInfo small show-class />
    </section>

    <section class="section-resources">
      <button
        class="button"
        @click="selectTree(ResourceTypes.power)"
        :class="{ selected: selectedTree === ResourceTypes.power }"
        style="--animation-index: 1"
      >
        <ValueBadge
          :type="ResourceTypes.power"
          :value="String($user.stats?.power)"
          :not-synced-value="$user.notSyncedStats?.power"
          small
          ref="power"
        />
      </button>
      <button
        class="button"
        @click="selectTree(ResourceTypes.agility)"
        :class="{ selected: selectedTree === ResourceTypes.agility }"
        style="--animation-index: 2"
      >
        <ValueBadge
          :type="ResourceTypes.agility"
          :value="String($user.stats?.agility)"
          :not-synced-value="$user.notSyncedStats?.agility"
          small
          ref="agility"
        />
      </button>
      <button
        class="button"
        @click="selectTree(ResourceTypes.intelligence)"
        :class="{ selected: selectedTree === ResourceTypes.intelligence }"
        style="--animation-index: 3"
      >
        <ValueBadge
          :type="ResourceTypes.intelligence"
          :value="String($user.stats?.intelligence)"
          :not-synced-value="$user.notSyncedStats?.intelligence"
          small
          ref="intelligence"
        />
      </button>
    </section>

    <hr>
    <section class="section-skills-tree">
      <ZoomPinch
        :min-scale="0.5"
        :max-scale="3"
        :offsets="{left: 100, top: 100, right: 100, bottom: 100}"
        mouse
        touch
        :inner-element-width="svgMaxWidth"
        :inner-element-height="svgMaxHeight"
        class="draggable-element"
        ref="draggableEl"
      >
        <div class="tree-container">
          <svg :viewBox="`0 0 ${svgMaxWidth} ${svgMaxHeight}`" :width="svgMaxWidth" :height="svgMaxHeight">
            <g class="lines">
              <g v-for="(skill, idx) in currentIterableSkillTree" :key="skill.id">
                <line
                  class="line"
                  v-for="(line, i) in skill.lines"
                  :key="i"
                  :class="{ dark: !$user.skills.includes(skill.parentId) }"
                  :x2="line[0] + 40"
                  :y2="line[1] + 40"
                  :x1="line[2] + 40"
                  :y1="line[3] + 40"
                  :style="{'--animation-index': 3 + idx + i}"
                />
              </g>
            </g>

            <g class="skills">
              <g v-for="(skill, idx) in currentIterableSkillTree" :key="skill.id" :style="{'--animation-index': idx}">
                <foreignObject
                  class="cell-container"
                  :x="skill.position[0]"
                  :y="skill.position[1]"
                  :width="80"
                  :height="80"
                >
                  <Cell class="cell" :item="skill" @click="selectSkill(skill)" no-stats>
                    <div class="item-name">{{ skill.name }}</div>
                    <transition name="opacity">
                      <div class="locked" v-if="!$user.skills.includes(skill.id)">
                        <img src="/static/icons/lock.svg" alt="locked">
                      </div>
                    </transition>
                    <transition name="opacity">
                      <div
                        class="cost"
                        :class="selectedTree"
                        v-if="
                          !$user.skills.includes(skill.id) &&
                            (skill.parentId === undefined || $user.skills.includes(skill.parentId))
                        "
                      >
                        {{ skill.cost }}
                      </div>
                    </transition>
                  </Cell>
                </foreignObject>
              </g>
            </g>
          </svg>
        </div>
      </ZoomPinch>
    </section>
    <hr>

    <transition mode="out-in" name="opacity">
      <section v-if="selectedSkill" class="section-modals" @click="selectedSkill = undefined">
        <transition mode="out-in" name="opacity">
          <ItemInfo
            class="modal"
            v-if="selectedSkill"
            :obj="selectedSkill"
            @click.stop
            @close="selectedSkill = undefined"
            image-with-shadow
            closable
          >
            <template #buttons>
              <ValueBadge :value="String($user.stats[ResourceTypesToStats[selectedTree]])" :type="selectedTree" />
              <div class="cost">
                Стоимость навыка:
                <span class="number">{{ Math.max(0, selectedSkill.cost - currentDiscounts[selectedTree]) }}</span>
              </div>
              <button
                v-if="
                  !$user.skills.includes(selectedSkill.id) &&
                    (selectedSkill.parentId === undefined || $user.skills.includes(selectedSkill.parentId))
                "
                @click="learnSkill(selectedSkill)"
                class="equip"
                :disabled="
                  selectedSkill.cost - currentDiscounts[selectedTree] > $user.stats[ResourceTypesToStats[selectedTree]]
                "
              >
                Изучить
              </button>
            </template>
          </ItemInfo>
        </transition>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import UserProfileInfo from '~/components/UserProfileInfo.vue';
import ValueBadge from '~/components/ValueBadge.vue';
import { BuffsTypes, ResourceType, ResourceTypes } from '~/constants/constants';
import Cell from '~/components/Cell.vue';
import { type Skill } from '~/types/types';
import { IterableSkillTrees } from '~/constants/skills';
import ItemInfo from '~/components/ItemInfo.vue';
import { ExtendedSkill, getAllUserBuffs } from '~/utils/utils';
import ZoomPinch from '@sergtyapkin/vue3-zoompinch';

export default {
  components: { ZoomPinch, ItemInfo, Cell, ValueBadge, UserProfileInfo },

  data() {
    return {
      selectedTree: ResourceTypes.power,
      selectedSkill: undefined as ExtendedSkill | undefined,
      currentDiscounts: {
        [ResourceTypes.power]: 0,
        [ResourceTypes.agility]: 0,
        [ResourceTypes.intelligence]: 0,
      },

      ResourceTypes,
      ResourceTypesToStats: {
        [ResourceTypes.power]: 'power',
        [ResourceTypes.agility]: 'agility',
        [ResourceTypes.intelligence]: 'intelligence',
      },
    };
  },

  computed: {
    currentIterableSkillTree(): ExtendedSkill[] {
      return IterableSkillTrees[this.selectedTree];
    },
    svgMaxWidth() {
      return (this.currentIterableSkillTree || []).reduce((acc, item) => Math.max(acc, item.position[0] + 80), 0);
    },
    svgMaxHeight() {
      return (this.currentIterableSkillTree || []).reduce((acc, item) => Math.max(acc, item.position[1] + 80), 0);
    },
  },

  mounted() {
    this.updateDiscounts();
  },

  methods: {
    updateDiscounts() {
      this.currentDiscounts[ResourceTypes.power] = 0;
      this.currentDiscounts[ResourceTypes.agility] = 0;
      this.currentDiscounts[ResourceTypes.intelligence] = 0;
      getAllUserBuffs(this.$user).forEach(buffs => {
        this.currentDiscounts[ResourceTypes.power] += buffs[BuffsTypes.powerCostDecrease] ?? 0;
        this.currentDiscounts[ResourceTypes.agility] += buffs[BuffsTypes.agilityCostDecrease] ?? 0;
        this.currentDiscounts[ResourceTypes.intelligence] += buffs[BuffsTypes.intelligenceCostDecrease] ?? 0;
      });
    },

    updateSkillPoints() {
      // this.$refs.power.$forceUpdate();
      // this.$refs.agility.$forceUpdate();
      // this.$refs.intelligence.$forceUpdate();
      this.$forceUpdate();
      (this.$refs.draggableEl as typeof ZoomPinch).$forceUpdate();
    },
    selectTree(type: ResourceType) {
      this.selectedTree = type;
    },
    selectSkill(skill: ExtendedSkill) {
      this.selectedSkill = skill;
    },

    learnSkill(skill: Skill) {
      const skillCost = Math.max(0, skill.cost - this.currentDiscounts[this.selectedTree]);
      if (this.$user.stats[this.ResourceTypesToStats[this.selectedTree]] < skillCost) {
        return;
      }
      this.$user.stats[this.ResourceTypesToStats[this.selectedTree]] -= skillCost;
      const idx = this.$user.skills.findIndex(i => i === skill.id!);
      if (idx === -1) {
        this.$user.skills.push(skill.id!);
      }
      this.selectedSkill = undefined;
      this.updateSkillPoints();
      this.$localStorageManager.saveSyncedData(this.$user, this.$guild);
    },
  },
};
</script>
