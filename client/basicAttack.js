
var attack_mode=false;

function get_nearest_monster_ny_name(args, name)
{
	//args:
	// max_att - max attack
	// min_xp - min XP
	// target: Only return monsters that target this "name" or player object
	// no_target: Only pick monsters that don't have any target
	// path_check: Checks if the character can move to the target
	// type: Type of the monsters, for example "goo", can be referenced from `show_json(G.monsters)` [08/02/17]
	var min_d=999999,target=null;

	if(!args) args={};
	if(args && args.target && args.target.name) args.target=args.target.name;
	if(args && args.type=="monster") game_log("get_nearest_monster: you used monster.type, which is always 'monster', use monster.mtype instead");
	if(args && args.mtype) game_log("get_nearest_monster: you used 'mtype', you should use 'type'");

	for(id in parent.entities)
	{
		var current=parent.entities[id];
		if(current.name===name) {
			if(current.type!="monster" || !current.visible || current.dead) continue;
			if(args.type && current.mtype!=args.type) continue;
			if(args.min_xp && current.xp<args.min_xp) continue;
			if(args.max_att && current.attack>args.max_att) continue;
			if(args.target && current.target!=args.target) continue;
			if(args.no_target && current.target && current.target!=character.name) continue;
			if(args.path_check && !can_move_to(current)) continue;
			var c_dist=parent.distance(character,current);
			if(c_dist<min_d) min_d=c_dist,target=current;
		}
	}
	return target;
}

setInterval(function(){
    if(!is_on_cooldown("regen_hp") && character.hp < character.max_hp) {
        use('regen_hp');
    }
    if(!is_on_cooldown("regen_mp") && character.mp < character.max_mp) {
        use('regen_mp');
    }
	//use_hp_or_mp();
	loot();

	if(!attack_mode || character.rip || is_moving(character)) return;

	var target=get_targeted_monster();
	if(!target)
	{
		target=get_nearest_monster_ny_name({min_xp:100,max_att:120}, "Goo");
		
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}
	
	if(!is_in_range(target))
	{
		move(
			character.x+(target.x-character.x)/2,
			character.y+(target.y-character.y)/2
			);
		// Walk half the distance
	}
	else if(can_attack(target))
	{
		set_message("Attacking");
		attack(target);
	}

},1000/20);