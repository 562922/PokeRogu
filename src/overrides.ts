import { type PokeballCounts } from "#app/battle-scene";
import { Gender } from "#app/data/gender";
import { Variant } from "#app/data/variant";
import { BaseStatBoosterModifierType, type ModifierOverride } from "#app/modifier/modifier-type";
import { Unlockables } from "#app/system/unlockables";
import { Abilities } from "#enums/abilities";
import { Biome } from "#enums/biome";
import { EggTier } from "#enums/egg-type";
import { Moves } from "#enums/moves";
import { MysteryEncounterTier } from "#enums/mystery-encounter-tier";
import { MysteryEncounterType } from "#enums/mystery-encounter-type";
import { PokeballType } from "#enums/pokeball";
import { Species } from "#enums/species";
import { StatusEffect } from "#enums/status-effect";
import { TimeOfDay } from "#enums/time-of-day";
import { VariantTier } from "#enums/variant-tier";
import { WeatherType } from "#enums/weather-type";
import { EvolutionItem } from "./data/balance/pokemon-evolutions";
import { Stat } from "./enums/stat";
import { MegaEvolutionAccessModifier } from "./modifier/modifier";

/**
 * Overrides that are using when testing different in game situations
 *
 * Any override added here will be used instead of the value in {@linkcode DefaultOverrides}
 *
 * If an override name starts with "STARTING", it will apply when a new run begins
 *
 * @example
 * ```
 * const overrides = {
 *   ABILITY_OVERRIDE: Abilities.PROTEAN,
 *   PASSIVE_ABILITY_OVERRIDE: Abilities.PIXILATE,
 * }
 * ```
 */
const overrides = {} satisfies Partial<InstanceType<typeof DefaultOverrides>>;

/**
 * If you need to add Overrides values for local testing do that inside {@linkcode overrides}
 * ---
 * Defaults for Overrides that are used when testing different in game situations
 *
 * If an override name starts with "STARTING", it will apply when a new run begins
 */
class DefaultOverrides {
  // -----------------
  // OVERALL OVERRIDES
  // -----------------
  /** a specific seed (default: a random string of 24 characters) */
  readonly SEED_OVERRIDE: string = "";
  readonly WEATHER_OVERRIDE: WeatherType = WeatherType.NONE;
  /**
   * If `null`, ignore this override.
   *
   * If `"single"`, set every non-trainer battle to be a single battle.
   *
   * If `"double"`, set every battle (including trainer battles) to be a double battle.
   *
   * If `"even-doubles"`, follow the `"double"` rule on even wave numbers, and follow the `"single"` rule on odd wave numbers.
   *
   * If `"odd-doubles"`, follow the `"double"` rule on odd wave numbers, and follow the `"single"` rule on even wave numbers.
   */
  readonly BATTLE_TYPE_OVERRIDE: BattleStyle | null = null;
  readonly STARTING_WAVE_OVERRIDE: number = 0;
  readonly STARTING_BIOME_OVERRIDE: Biome = Biome.TOWN;
  readonly ARENA_TINT_OVERRIDE: TimeOfDay | null = null;
  /** Multiplies XP gained by this value including 0. Set to null to ignore the override */
  readonly XP_MULTIPLIER_OVERRIDE: number = 5;
  readonly NEVER_CRIT_OVERRIDE: boolean = false;
  /** default 1000 */
  readonly STARTING_MONEY_OVERRIDE: number = 50000000;
  /** Sets all shop item prices to 0 */
  readonly WAIVE_SHOP_FEES_OVERRIDE: boolean = true;
  /** Sets reroll price to 0 */
  readonly WAIVE_ROLL_FEE_OVERRIDE: boolean = true;
  readonly FREE_CANDY_UPGRADE_OVERRIDE: boolean = true;
  readonly POKEBALL_OVERRIDE: { active: boolean; pokeballs: PokeballCounts } = {
    active: false,
    pokeballs: {
      [PokeballType.POKEBALL]: 50,
      [PokeballType.GREAT_BALL]: 0,
      [PokeballType.ULTRA_BALL]: 0,
      [PokeballType.ROGUE_BALL]: 0,
      [PokeballType.MASTER_BALL]: 999,
    },
  };
  /** Forces an item to be UNLOCKED */
  readonly ITEM_UNLOCK_OVERRIDE: Unlockables[] = [];
  /** Set to `true` to show all tutorials */
  readonly BYPASS_TUTORIAL_SKIP_OVERRIDE: boolean = false;
  /** Set to `true` to be able to re-earn already unlocked achievements */
  readonly ACHIEVEMENTS_REUNLOCK_OVERRIDE: boolean = false;
  /** Set to `true` to force Paralysis and Freeze to always activate, or `false` to force them to not activate */
  readonly STATUS_ACTIVATION_OVERRIDE: boolean | null = null;

  // ----------------
  // PLAYER OVERRIDES
  // ----------------
  /**
   * Set the form index of any starter in the party whose `speciesId` is inside this override
   * @see {@link allSpecies} in `src/data/pokemon-species.ts` for form indexes
   * @example
   * ```
   * const STARTER_FORM_OVERRIDES = {
   *   [Species.DARMANITAN]: 1
   * }
   * ```
   */
  readonly STARTER_FORM_OVERRIDES: Partial<Record<Species, number>> = {};

  /** default 5 or 20 for Daily */
  readonly STARTING_LEVEL_OVERRIDE: number = 500;
  /**
   * SPECIES OVERRIDE
   * will only apply to the first starter in your party or each enemy pokemon
   * default is 0 to not override
   * @example SPECIES_OVERRIDE = Species.Bulbasaur;
   */
  readonly STARTER_SPECIES_OVERRIDE: Species.RAYQUAZA;
  /**
   * This will force your starter to be a random fusion
   */
  readonly STARTER_FUSION_OVERRIDE: boolean = true;
  /**
   * This will override the species of the fusion
   */
  readonly STARTER_FUSION_SPECIES_OVERRIDE: Species.ETERNATUS;
  readonly ABILITY_OVERRIDE: Abilities = Abilities.AIR_LOCK;
  readonly PASSIVE_ABILITY_OVERRIDE: Abilities = Abilities.LEVITATE;
  readonly STATUS_OVERRIDE: StatusEffect = StatusEffect.NONE;
  readonly GENDER_OVERRIDE: Gender | null = null;
  readonly MOVESET_OVERRIDE: Moves | Array<Moves> = [Moves.ETERNABEAM, Moves.EARTHQUAKE, Moves.PSYCHIC, Moves.PRISMATIC_LASER];
  readonly SHINY_OVERRIDE: boolean = true;
  readonly VARIANT_OVERRIDE: Variant = VariantTier.EPIC;
  readonly STAT_OVERIDE: Stat | Array<Stat> = [Stat.HP, Stat.ATK, Stat.DEF, Stat.SPATK, Stat.SPDEF, Stat.SPD, Stat.EVA, Stat.ACC]
  // --------------------------
  // OPPONENT / ENEMY OVERRIDES
  // --------------------------
  readonly OPP_SPECIES_OVERRIDE: Species | number = 0;
  /**
   * This will make all opponents fused Pokemon
   */
  readonly OPP_FUSION_OVERRIDE: boolean = false;
  /**
   * This will override the species of the fusion only when the opponent is already a fusion
   */
  readonly OPP_FUSION_SPECIES_OVERRIDE: Species | number = 0;
  readonly OPP_LEVEL_OVERRIDE: number = 0;
  readonly OPP_ABILITY_OVERRIDE: Abilities = Abilities.NONE;
  readonly OPP_PASSIVE_ABILITY_OVERRIDE: Abilities = Abilities.NONE;
  readonly OPP_STATUS_OVERRIDE: StatusEffect = StatusEffect.NONE;
  readonly OPP_GENDER_OVERRIDE: Gender | null = null;
  readonly OPP_MOVESET_OVERRIDE: Moves | Array<Moves> = [];
  readonly OPP_SHINY_OVERRIDE: boolean | null = null;
  readonly OPP_VARIANT_OVERRIDE: Variant | null = null;
  readonly OPP_IVS_OVERRIDE: number | number[] = [];
  readonly OPP_FORM_OVERRIDES: Partial<Record<Species, number>> = {};
  /**
   * Override to give the enemy Pokemon a given amount of health segments
   *
   * 0 (default): the health segments will be handled normally based on wave, level and species
   * 1: the Pokemon will have a single health segment and therefore will not be a boss
   * 2+: the Pokemon will be a boss with the given number of health segments
   */
  readonly OPP_HEALTH_SEGMENTS_OVERRIDE: number = 0;

  // -------------
  // EGG OVERRIDES
  // -------------
  readonly EGG_IMMEDIATE_HATCH_OVERRIDE: boolean = true;
  readonly EGG_TIER_OVERRIDE: EggTier.LEGENDARY;
  readonly EGG_SHINY_OVERRIDE: boolean = true;
  readonly EGG_VARIANT_OVERRIDE: VariantTier.EPIC;
  readonly EGG_FREE_GACHA_PULLS_OVERRIDE: boolean = true;
  readonly EGG_GACHA_PULL_COUNT_OVERRIDE: number = 10;
  readonly UNLIMITED_EGG_COUNT_OVERRIDE: boolean = false;

  // -------------------------
  // MYSTERY ENCOUNTER OVERRIDES
  // -------------------------

  /**
   * `1` (almost never) to `256` (always), set to `null` to disable the override
   *
   * Note: Make sure `STARTING_WAVE_OVERRIDE > 10`, otherwise MEs won't trigger
   */
  readonly MYSTERY_ENCOUNTER_RATE_OVERRIDE: number | null = null;
  readonly MYSTERY_ENCOUNTER_TIER_OVERRIDE: MysteryEncounterTier | null = null;
  readonly MYSTERY_ENCOUNTER_OVERRIDE: MysteryEncounterType | null = null;

  // -------------------------
  // MODIFIER / ITEM OVERRIDES
  // -------------------------
  /**
   * Overrides labeled `MODIFIER` deal with any modifier so long as it doesn't require a party
   * member to hold it (typically this is, extends, or generates a {@linkcode ModifierType}),
   * like `EXP_SHARE`, `CANDY_JAR`, etc.
   *
   * Overrides labeled `HELD_ITEM` specifically pertain to any entry in {@linkcode modifierTypes} that
   * extends, or generates a {@linkcode PokemonHeldItemModifierType}, like `SOUL_DEW`, `TOXIC_ORB`, etc.
   *
   * Note that, if count is not provided, it will default to 1.
   *
   * Additionally, note that some held items and modifiers are grouped together via
   * a {@linkcode ModifierTypeGenerator} and require pre-generation arguments to get
   * a specific item from that group. If a type is not set, the generator will either
   * use the party to weight item choice or randomly pick an item.
   *
   * @example
   * ```
   * // Will have a quantity of 2 in-game
   * STARTING_MODIFIER_OVERRIDE = [{name: "EXP_SHARE", count: 2}]
   * // Will have a quantity of 1 in-game
   * STARTING_HELD_ITEM_OVERRIDE = [{name: "LUCKY_EGG"}]
   * // Type must be given to get a specific berry
   * STARTING_HELD_ITEM_OVERRIDE = [{name: "BERRY", type: BerryType.SITRUS}]
   * // A random berry will be generated at runtime
   * STARTING_HELD_ITEM_OVERRIDE = [{name: "BERRY"}]
   * ```
   */
  readonly STARTING_MODIFIER_OVERRIDE: ModifierOverride[] = [
    {name: "EXP_SHARE", count: 5}
    ,{name: "ABILITY_CHARM", count: 5}
    ,{name: "CANDY_JAR", count: 499}
    ,{name: "DYNAMAX_BAND"}
    ,{name: "EXP_CHARM", count: 500}
    ,{name: "SUPER_EXP_CHARM", count: 500}
    ,{name: "GRIP_CLAW", count: 10}
    ,{name: "MINI_BLACK_HOLE", count: 15}
    ,{name: "GOLDEN_EGG", count: 5}
    ,{name: "GOLDEN_EXP_CHARM", count: 10}
    ,{name: "GOLDEN_POKEBALL", count: 5}
    ,{name: "GOLDEN_PUNCH", count: 10}
    ,{name: "LOCK_CAPSULE"}
    ,{name: "MAP"}
    ,{name: "AMULET_COIN", count: 5}
    ,{name: "MEGA_BRACELET"}
    ,{name: "DYNAMAX_BAND"}
    ,{name: "SHINY_CHARM", count: 5}
    ,{name: "TERA_ORB"}
  ];
  /**
   * Override array of {@linkcode ModifierOverride}s used to provide modifiers to enemies.
   *
   * Note that any previous modifiers are cleared.
   */
  readonly OPP_MODIFIER_OVERRIDE: ModifierOverride[] = [];

  /** Override array of {@linkcode ModifierOverride}s used to provide held items to first party member when starting a new game. */
  readonly STARTING_HELD_ITEMS_OVERRIDE: ModifierOverride[] = [
    {name: "BASE_STAT_BOOSTER", type: Stat.HP, count: 20}
    ,{name: "BASE_STAT_BOOSTER", type: Stat.ATK, count: 20}
    ,{name: "BASE_STAT_BOOSTER", type: Stat.DEF, count: 20}
    ,{name: "BASE_STAT_BOOSTER", type: Stat.SPATK, count: 20}
    ,{name: "BASE_STAT_BOOSTER", type: Stat.SPDEF, count: 20}
    ,{name: "BASE_STAT_BOOSTER", type: Stat.SPD, count: 20}
    ,{name: "BASE_STAT_BOOSTER", type: Stat.EVA, count: 20}
    ,{name: "BASE_STAT_BOOSTER", type: Stat.ACC, count: 20}
    ,{name: "RARE_EVOLUTION_ITEM", type: EvolutionItem.}
  ];
  /** Override array of {@linkcode ModifierOverride}s used to provide held items to enemies on spawn. */
  readonly OPP_HELD_ITEMS_OVERRIDE: ModifierOverride[] = [];

  /**
   * Override array of {@linkcode ModifierOverride}s used to replace the generated item rolls after a wave.
   *
   * If less entries are listed than rolled, only those entries will be used to replace the corresponding items while the rest randomly generated.
   * If more entries are listed than rolled, only the first X entries will be used, where X is the number of items rolled.
   *
   * Note that, for all items in the array, `count` is not used.
   */
  readonly ITEM_REWARD_OVERRIDE: ModifierOverride[] = [];
}

export const defaultOverrides = new DefaultOverrides();

export default {
  ...defaultOverrides,
  ...overrides
} satisfies InstanceType<typeof DefaultOverrides>;

export type BattleStyle = "double" | "single" | "even-doubles" | "odd-doubles";
