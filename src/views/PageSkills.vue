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

  .section-resources
    display flex
    flex-wrap wrap
    gap 5px
    justify-content space-around
    margin-top 20px
    margin-bottom 60px

    .button
      button-no-styles()

      padding 10px
      border-radius borderRadiusM
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
        user-select none
        overflow visible

        .skills
          .cell-container
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
            stroke-width 2px
            trans()

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
    <section class="section-user-info">
      <UserProfileInfo small />
    </section>

    <section class="section-resources">
      <button
        class="button"
        @click="selectTree(ResourceTypes.power)"
        :class="{ selected: selectedTree === ResourceTypes.power }"
      >
        <ValueBadge
          :type="ResourceTypes.power"
          :value="$user.stats?.power"
          :not-synced-value="$user.notSyncedStats?.power"
          small
          ref="power"
        />
      </button>
      <button
        class="button"
        @click="selectTree(ResourceTypes.agility)"
        :class="{ selected: selectedTree === ResourceTypes.agility }"
      >
        <ValueBadge
          :type="ResourceTypes.agility"
          :value="$user.stats?.agility"
          :not-synced-value="$user.notSyncedStats?.agility"
          small
          ref="agility"
        />
      </button>
      <button
        class="button"
        @click="selectTree(ResourceTypes.intelligence)"
        :class="{ selected: selectedTree === ResourceTypes.intelligence }"
      >
        <ValueBadge
          :type="ResourceTypes.intelligence"
          :value="$user.stats?.intelligence"
          :not-synced-value="$user.notSyncedStats?.intelligence"
          small
          ref="intelligence"
        />
      </button>
    </section>

    <hr>
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
        :inner-element-width="svgMaxWidth"
        :inner-element-height="svgMaxHeight"
        class="draggable-element"
      >
        <div class="tree-container">
          <svg :viewBox="`0 0 ${svgMaxWidth} ${svgMaxHeight}`" :width="svgMaxWidth" :height="svgMaxHeight">
            <g class="lines">
              <g v-for="skill in currentIterableSkillTree" :key="skill.id">
                <line
                  class="line"
                  v-for="(line, i) in skill.lines"
                  :key="i"
                  :class="{ dark: !$user.skills.includes(skill.parentId) }"
                  :x1="line[0] + 40"
                  :y1="line[1] + 40"
                  :x2="line[2] + 40"
                  :y2="line[3] + 40"
                />
              </g>
            </g>

            <g class="skills">
              <g v-for="skill in currentIterableSkillTree" :key="skill.id">
                <foreignObject
                  class="cell-container"
                  :x="skill.position[0]"
                  :y="skill.position[1]"
                  :width="80"
                  :height="80"
                >
                  <Cell class="cell" :src="skill.imageUrl" @click="selectSkill(skill)">
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
      </DraggableComponent>
    </section>
    <hr>

    <transition mode="out-in" name="opacity">
      <section
        v-if="selectedSkill"
        class="section-modals"
        @click="
          selectedSkill = undefined;
        "
      >
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
              <ValueBadge :value="$user.stats[ResourceTypesToStats[selectedTree]]" :type="selectedTree" />
              <div class="cost">Стоимость навыка: <span class="number">{{ selectedSkill.cost }}</span></div>
              <button
                v-if="!$user.skills.includes(selectedSkill.id) && (selectedSkill.parentId === undefined || $user.skills.includes(selectedSkill.parentId))"
                @click="learnSkill(selectedSkill)"
                class="equip"
                :disabled="selectedSkill.cost > $user.stats[ResourceTypesToStats[selectedTree]]"
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
import { ResourceType, ResourceTypes } from '~/constants/constants';
import DraggableComponent from '~/components/DraggableComponent.vue';
import Cell from '~/components/Cell.vue';
import { type Skill } from '~/types/types';
import { IterableSkillTrees } from '~/constants/skills';
import ItemInfo from '~/components/ItemInfo.vue';
import { ExtendedSkill } from '~/utils/utils';

export default {
  components: { ItemInfo, Cell, DraggableComponent, ValueBadge, UserProfileInfo },

  data() {
    return {
      selectedTree: ResourceTypes.power,
      selectedSkill: undefined as ExtendedSkill | undefined,

      ResourceTypes,
      ResourceTypesToStats: {
        [ResourceTypes.power]: 'power',
        [ResourceTypes.agility]: 'agility',
        [ResourceTypes.intelligence]: 'intelligence',
      }
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

  mounted() {},

  methods: {
    updateSkillPoints() {
      // this.$refs.power.$forceUpdate();
      // this.$refs.agility.$forceUpdate();
      // this.$refs.intelligence.$forceUpdate();
      this.$forceUpdate();
      (this.$refs.draggableEl as typeof DraggableComponent).$forceUpdate();
    },
    selectTree(type: ResourceType) {
      this.selectedTree = type;
    },
    selectSkill(skill: ExtendedSkill) {
      this.selectedSkill = skill;
    },

    learnSkill(skill: Skill) {
      if (this.$user.stats[this.ResourceTypesToStats[this.selectedTree]] < skill.cost) {
        return;
      }
      this.$user.stats[this.ResourceTypesToStats[this.selectedTree]] -= skill.cost;
      const idx = this.$user.skills.findIndex(i => i === skill.id!);
      if (idx === -1) {
        this.$user.skills.push(skill.id!);
      }
      this.selectedSkill = undefined;
      this.updateSkillPoints();
      this.$localStorageManager.saveSyncedData(this.$user, this.$guild);
    }
  },
};
</script>
